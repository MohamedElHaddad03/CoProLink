# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework import generics
from users.serializers import CombinedUserSerializer, LoginSerializer
from interfaces.models import Copropriete
from .models import Profile
from django.contrib.auth.models import User
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, logout
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_decode

@api_view(["POST"])
def signup(request):
    request.data['profile']['role']="admin"
    utilisateur=CombinedUserSerializer(data=request.data)
    if utilisateur.is_valid():
        utilisateur.validated_data['is_active'] = False
        profile = utilisateur.validated_data.pop('profile')
        user = User.objects.create(**utilisateur.validated_data)
        Profile.objects.create(user=user, **profile)

        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)
        activation_link = f"http://127.0.0.1:8000/activation/{uid}/{token}/"
        subject = 'CoProLink-Activation de votre Compte'
        message = f"Bonjour,\n\nBienvenu à notre application ! \n\n Voici votre Username ou Nom d'utilisateur : {user.username} \n\n Il est nécessaire d'activer votre compte, veuillez cliquer sur le lien affiché pour y procéder.\n\n {activation_link}"
        send_mail(subject, message, 'elbaghdadinada5@gmail.com', [user.email])

        return Response("Utilisateur créé avec succès !", status=status.HTTP_201_CREATED)
    else:
        return Response(utilisateur.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(["GET"])
def activation_compte(request, uidb64, token):
    uid = urlsafe_base64_decode(uidb64).decode('utf-8')
    user = User.objects.get(pk=uid)

    if default_token_generator.check_token(user, token):
        user.is_active = True
        user.save()

        message = f"Compte activé avec succès ! Vous pouvez désormais retourner à l'application"
        return render(request, 'activation_message.html', {'message': message})
    else:
        message = "Lien d'activation invalide."
        return render(request, 'templates/activation_message.html', {'message': message})



class ProfileListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = CombinedUserSerializer

    def get_queryset(self):
        user = self.request.user
        return User.objects.filter(profile__id_cop=user.profile.id_cop)


class ProfileRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = CombinedUserSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        super().destroy(request, *args, **kwargs)
        return Response(
            {"message": "L'utilisateur a été supprimé avec succès!"},
            status=status.HTTP_200_OK,
        )


@api_view(["GET"])
def List_Users(request):
    users = User.objects.all()
    serializer = CombinedUserSerializer(users, many=True)
    return Response(serializer.data)


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data["username"]
            password = serializer.validated_data["password"]
            user = authenticate(request, username=username, password=password)
            if user is not None:
                token, created = Token.objects.get_or_create(user=user)
                user = get_object_or_404(User, username=username)
                serializernew = CombinedUserSerializer(user)
                response = {"User": serializernew.data, "Token": token.key}

                return Response(response, status=status.HTTP_200_OK)
            else:
                response = {
                    "erreur": "Username ou mot de passe invalide",
                }
                return Response(response, status=status.HTTP_401_UNAUTHORIZED)
        response = {"erreur": serializer.errors}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        if user is not None:
            token = Token.objects.get(user=user)
            token.delete()

            logout(request)

            return Response(
                {"message": "Utilisateur déconnecté avec succès!"},
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {"erreur": "Pas d'utilisateur connecté actuellement!"},
                status=status.HTTP_400_BAD_REQUEST,
            )


""" from django.shortcuts import render
from django.contrib.auth.forms import SetPasswordForm


def reset_password(request, uidb64, token):
    form = SetPasswordForm(uidb64)
    return render(request, "password_reset.html", {"form": form})
 """
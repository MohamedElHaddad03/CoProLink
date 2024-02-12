# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework import generics
from users.serializers import CombinedUserSerializer, LoginSerializer, UpdateUserSerializer
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
from django.template.loader import render_to_string
from rest_framework.exceptions import ValidationError
from django.core.mail import send_mail
from django.utils import timezone

@api_view(["POST"])
def signup(request):
    request.data['profile']['role']="admin"
    utilisateur=CombinedUserSerializer(data=request.data)
    if utilisateur.is_valid():
        utilisateur.validated_data['is_active'] = False
        profile = utilisateur.validated_data.pop('profile')
        utilisateur.validated_data['password']=make_password(utilisateur.validated_data['password'])
        user = User.objects.create(**utilisateur.validated_data)
        Profile.objects.create(user=user, **profile)

        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)
        lien = f"http://16.171.140.68:8000/activation/{uid}/{token}/"
        subject = 'CoProLink-Activation de Compte'
        message1 = "Bienvenue à notre application !"
        message2 = "Voici votre Username ou Nom d'utilisateur :" + str(
            user.username
        )
        message3 = "Il est nécessaire d'activer votre compte, veuillez cliquer sur le bouton affiché au dessous pour y procéder."
        message4 = "ACTIVER"
        
        html_message = render_to_string(
            "email.html",
            {
                "message1": message1,
                "message2": message2,
                "message3": message3,
                "message4": message4,
                "lien": lien,
            },
        )
        send_mail(
            subject,
            "",
            "noreplycoprolink@gmail.com",
            [user.email],
            html_message=html_message,
        )
        return Response({"message": "Utilisateur créé avec succès. Vérifiez votre e-mail pour l'activation."})

    return Response({"errors": utilisateur.errors}, status=400)
    

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

                current_time = timezone.now()
                email_subject = 'Alerte de connexion !'
                email_body = f'User {user.username} s\'est connecté le {current_time}. \n\nUsername: {user.username}\nEmail: {user.email}\nPrénom: {user.first_name}\nNom: {user.last_name}'
                copophh = 'noreplycoprolink@gmail.com'
                send_mail(email_subject, email_body, copophh, ['coprolink@gmail.com'])

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


@api_view(["GET"])
def mdp_oublie(request,email):
        user= get_object_or_404(User,email=email)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)
        lien = f"http://16.171.140.68:8000/reset/{uid}/{token}/"
        message1 = "Bienvenue à notre application !"
        message2 = "Voici votre Username ou Nom d'utilisateur :" + str(
            user.username
        )
        message3 = "Vous avez initié une demande de modification de mot de passe, veuillez cliquer sur le bouton au dessous :"
        message4 = "Réinitialiser MDP"
        subject = "CoProLink-Changement de mot de passe"
        html_message = render_to_string(
            "email.html",
            {
                "message1": message1,
                "message2": message2,
                "message3": message3,
                "message4": message4,
                "lien": lien,
            },
        )
        send_mail(
            subject,
            "",
            "noreplycoprolink@gmail.com",
            [user.email],
            html_message=html_message,
        )
        return Response({"message":"email sent successfully"})

@api_view(["GET"])
def valider_email_unique(request,email):
    if User.objects.filter(email=email).exists():
       return Response({"message":-1})
    else:
        return Response({"message":1})

@api_view(["PATCH"])
def UserUpdate(request, id_user):
    user = get_object_or_404(User, pk=id_user)

    if request.user.profile.role != "syndic":
        return Response({"detail": "You do not have permission to update this profile."}, status=403)

    serializer = UpdateUserSerializer(user, data=request.data, partial=True, context={'request': request})

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors, status=400)

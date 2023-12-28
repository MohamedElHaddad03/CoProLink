# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
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
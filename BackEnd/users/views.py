# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404, render
from rest_framework import generics

from users.serializers import CombinedUserSerializer
from interfaces.models import Copropriete
from .models import Profile
from django.contrib.auth.models import User
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import api_view

class ProfileListCreateView(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = CombinedUserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CombinedUserSerializer(data=request.data)
        if serializer.is_valid():
            donnees=request.data
            user= User.objects.create(username=donnees['username'],password=make_password(donnees['password']),email=donnees['email'])
            
            copropriete_id = donnees['Profile']['id_prop']
            copropriete = get_object_or_404(Copropriete, id_cop=copropriete_id)
            profile=Profile.objects.create(user=user,telephone=donnees['Profile']['telephone'],role=donnees['Profile']['role'],id_prop=copropriete)
            profile.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProfileRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = CombinedUserSerializer

@api_view(['GET'])
def List_Users(request):
    users=User.objects.all()
    serializer=CombinedUserSerializer(users,many=True)
    return Response(serializer.data)

from rest_framework import serializers
from users.models import Profile
from django.contrib.auth.models import User


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['telephone', 'role', 'id_prop']

class CombinedUserSerializer(serializers.ModelSerializer):
    Profile = ProfileSerializer()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'Profile']

        # def create(self, validated_data):
        #     user_data = validated_data.pop('utilisateur')
        #     user = User.objects.create(**validated_data)
        #     Utilisateur.objects.create(user=user, **user_data)
        #     return user
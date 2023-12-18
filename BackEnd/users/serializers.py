from rest_framework import serializers
from users.models import Profile
from django.contrib.auth.models import User



class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['telephone', 'role', 'id_prop']

class CombinedUserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'profile']

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        user = User.objects.create(**validated_data)
        Profile.objects.create(user=user, **profile_data)
        return user
    
    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile')
        profile = instance.profile

        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.save()

        profile.telephone = profile_data.get(
            'telephone',
            profile.telephone
        )
        profile.role = profile_data.get(
            'role',
            profile.role
         )
        profile.id_prop = profile_data.get(
            'id_prop',
            profile.id_prop
        )
        profile.save()

        return instance
    
class LoginSerializer(serializers.ModelSerializer):
      username=serializers.CharField(max_length=50)
      class Meta:
        model = User
        fields = ['username','password']   


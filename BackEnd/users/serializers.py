from rest_framework import serializers
from users.models import Profile
from django.contrib.auth.models import User



class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['cin', 'telephone', 'role', 'id_cop']

class CombinedUserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = ['id', 'username','password', 'email', 'first_name', 'last_name', 'profile']

    def create(self, validated_data):
        utilisateur=self.context['request'].user
        profile_data = validated_data.pop('profile')
        if utilisateur.profile.role == "admin":
            profile_data['role']="proprietaire"
            profile_data['id_cop']=utilisateur.profile.id_cop
        if utilisateur.profile.role == "gestion":
            profile_data['role']="admin"
        user = User.objects.create(**validated_data)
        Profile.objects.create(user=user, **profile_data)
        return user
    
    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile')
        profile = instance.profile

        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.save()

        profile.cin = profile_data.get(
            'cin',
            profile.cin
        )
        profile.telephone = profile_data.get(
            'telephone',
            profile.telephone
        )
        profile.role = profile_data.get(
            'role',
            profile.role
         )
        profile.id_cop = profile_data.get(
            'id_cop',
            profile.id_cop
        )
        profile.save()

        return instance
    
class LoginSerializer(serializers.ModelSerializer):
      username=serializers.CharField(max_length=50)
      class Meta:
        model = User
        fields = ['username','password']   


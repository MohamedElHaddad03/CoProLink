from django.shortcuts import get_object_or_404
from rest_framework import serializers
from interfaces.models import Cotisation,Propriete
from users.models import Profile
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password



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
        if utilisateur.profile.role == "syndic":
            profile_data['role']="proprietaire"
            profile_data['id_cop']=utilisateur.profile.id_cop
            cot = self.context['request'].data['id_cot']
            id_prop = self.context['request'].data['id_prop']
            prop = get_object_or_404(Propriete,pk=id_prop)
            cot = get_object_or_404(Cotisation,pk=cot)
        if utilisateur.profile.role == "admin":
            profile_data['role']="syndic"

        validated_data['password']=make_password(validated_data['password'])
        user = User.objects.create(**validated_data)
        if utilisateur.profile.role == "syndic":
            prop.id_user = user
            prop.id_cot = cot
            prop.save()
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

        # Vérifier si le numéro de téléphone a été modifié
        new_telephone = profile_data.get('telephone', profile.telephone)
        if new_telephone != profile.telephone:
            # Vérifier si un autre utilisateur a déjà ce numéro de téléphone
            existing_profile = Profile.objects.filter(telephone=new_telephone).exclude(user=instance)
            if existing_profile.exists():
                # Le numéro de téléphone est déjà utilisé par un autre profil
                profile.telephone = profile.telephone
            else:
                # Mettre à jour le numéro de téléphone
                profile.telephone = new_telephone

        profile.cin = profile_data.get('cin', profile.cin)
        profile.role = profile_data.get('role', profile.role)
        profile.id_cop = profile_data.get('id_cop', profile.id_cop)
        profile.save()

        return instance

    
class LoginSerializer(serializers.ModelSerializer):
      username=serializers.CharField(max_length=50)
      class Meta:
        model = User
        fields = ['username','password']   


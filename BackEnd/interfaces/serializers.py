from . import models
from rest_framework import serializers
from interfaces.models import Copropriete, Propriete


class DepenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Depense
        fields = '__all__'

class ProprieteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Propriete
        fields = '__all__'

class CoproprieteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Copropriete
        fields = '__all__'
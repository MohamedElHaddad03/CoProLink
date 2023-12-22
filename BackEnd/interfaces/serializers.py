from . import models
from rest_framework import serializers


class DepenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Depense
        fields = '__all__'

       
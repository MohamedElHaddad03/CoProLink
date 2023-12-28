from . import models
from rest_framework import serializers
from interfaces.models import Copropriete, Cotisation, Document, Paiement, Propriete


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

class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = '__all__'

class CotisationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cotisation
        fields = '__all__'

class PaiementSerializer(serializers.ModelSerializer):
    num = serializers.ReadOnlyField(source='id_prop.num')
    class Meta:
        model = Paiement
        fields = '__all__'

class PaiementStatSerializer(serializers.ModelSerializer):
    num = serializers.ReadOnlyField(source='id_prop.num')
    class Meta:
        model = Paiement
        fields = ['id_pay','etat','num','date_creation','date_paiement']
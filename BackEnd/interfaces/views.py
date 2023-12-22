from django.shortcuts import get_object_or_404, render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Paiement
from rest_framework.decorators import api_view

# Create your views here.

@api_view(["GET"])
def ValiderRejeterPay(request,id_pay):
    paiement = get_object_or_404(Paiement, id_pay=id_pay)
    if paiement:
        paiement.etat = not paiement.etat
        paiement.save()
        if paiement.etat is True:
            return Response({"message": "Paiement validé avec succès",
            },status=status.HTTP_200_OK,
            )
        else: 
            return Response({"message": "Paiement rejeté avec succès",
            },status=status.HTTP_200_OK,
            )
        
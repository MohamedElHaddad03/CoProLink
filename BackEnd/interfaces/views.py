from django.shortcuts import get_object_or_404, render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Paiement, Depense
from rest_framework.decorators import api_view
from .serializers import DepenseSerializer
from django.db.models import Sum


@api_view(["GET"])
def ValiderRejeterPay(request, id_pay):
    paiement = get_object_or_404(Paiement, id_pay=id_pay)
    if paiement:
        paiement.etat = not paiement.etat
        paiement.save()
        if paiement.etat is True:
            return Response(
                {
                    "message": "Paiement validé avec succès",
                },
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {
                    "message": "Paiement rejeté avec succès",
                },
                status=status.HTTP_200_OK,
            )


@api_view(["GET"])
def DepenseList(request):
    depenses_par_categorie = {
        "Assainissement": Depense.objects.filter(categorie="Assainissement"),
        "Maintenance et reparation": Depense.objects.filter(
            categorie="Maintenance et reparation"
        ),
        "Matériel": Depense.objects.filter(categorie="Matériel"),
        "Gardiennage": Depense.objects.filter(categorie="Gardiennage"),
        "Autre": Depense.objects.filter(categorie="Autre"),
    }

    serialized_depenses_par_categorie = {
        categorie: {
            "depenses": DepenseSerializer(depenses, many=True).data,
            "montant_total": depenses.aggregate(Sum("montant"))["montant__sum"] or 0,
        }
        for categorie, depenses in depenses_par_categorie.items()
    }

    return Response(serialized_depenses_par_categorie)

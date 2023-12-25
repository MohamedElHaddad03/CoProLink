from django.shortcuts import get_object_or_404, render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Copropriete, Cotisation, Paiement, Depense, Propriete
from rest_framework.decorators import api_view
from .serializers import CoproprieteSerializer, DepenseSerializer, ProprieteSerializer
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

@api_view(["POST"])
def CreateDepense(request):
    serializer = DepenseSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response({"message": "Données saisies erronées"})

@api_view(["Delete"])
def DeleteDepense(request,id_dep):
    depense = get_object_or_404(Depense, pk=id_dep)
    depense.delete()
    return Response({"message": "Dépense supprimée avec succès !"})

@api_view(["GET"])
def ListProp(request):
    props = Propriete.objects.all()
    serializer = ProprieteSerializer(props,many=True)
    return Response(serializer.data)

@api_view(["DELETE"])
def DeleteProp(request, id_prop):
    prop = get_object_or_404(Propriete,id_prop=id_prop)
    prop.delete()
    return Response({"message": "Propriété supprimé avec succès"})

@api_view(["POST"])
def CreateProp(request):
    serializer = ProprieteSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    prop = serializer.data
    return Response(prop)

@api_view(['POST'])
def CreateCopro(request):
    user=request.user
    serializer = CoproprieteSerializer(data=request.data)
    if serializer.is_valid():
        copro= serializer.save()
        nbpro = serializer.validated_data.get('nb_props')
        for i in range(nbpro):
            Propriete.objects.create(
                num = 'prop'+str(i),
                id_user = None,
                occupation = False,
                id_cop = copro,
                id_cot = None
            )
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response({"message":"Erreur données saisies invalides !"})

@api_view(['GET'])
def ListCopro(request):
    Copro = Copropriete.objects.all()
    serializer = CoproprieteSerializer(Copro, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
def DeleteCopro(request,id_cop):
    copro = get_object_or_404(Copropriete, pk=id_cop)
    serializer=CoproprieteSerializer(copro)
    if copro:
        Propriete.objects.filter(id_cop=copro.id_cop).delete()
        copro.delete()
    return Response({"message":"Copropriété supprimé avec succès","Copropriete":serializer.data})


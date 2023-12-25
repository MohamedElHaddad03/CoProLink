from django.shortcuts import get_object_or_404, render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Copropriete, Cotisation, Document, Paiement, Depense, Propriete
from rest_framework.decorators import api_view
from .serializers import CoproprieteSerializer, DepenseSerializer, DocumentSerializer, PaiementSerializer, ProprieteSerializer
from django.db.models import Sum

@api_view(["GET"])
def ListerPaiement(request):
    pay = Paiement.objects.all()
    serializer = PaiementSerializer(pay, many=True)
    return Response(serializer.data)

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
    cop = request.user.profile.id_cop
    request.data['id_cop']=cop.id_cop
    serializer = DepenseSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response({"message": "Données saisies erronées"})


@api_view(["Delete"])
def DeleteDepense(request, id_dep):
    depense = get_object_or_404(Depense, pk=id_dep)
    depense.delete()
    return Response({"message": "Dépense supprimée avec succès !"})


@api_view(["PATCH"])
def DepenseUpdate(request, id_dep):
    if request.method == "PATCH":
        new_data = {
            "nomDep": request.data.get("nomDep"),
            "categorie": request.data.get("categorie"),
            "description": request.data.get("description"),
            "montant": request.data.get("montant"),
            "date_dep": request.data.get("date_dep"),
        }

        depense = get_object_or_404(Depense, id_depense=id_dep)

        serializer = DepenseSerializer(depense, data=new_data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "depense modifiée avec succès"})
        return Response(serializer.errors, status=400)

    return Response({"error": "Invalid request method"}, status=400)


@api_view(["GET"])
def ListProp(request):
    props = Propriete.objects.all()
    serializer = ProprieteSerializer(props, many=True)
    return Response(serializer.data)


@api_view(["DELETE"])
def DeleteProp(request, id_prop):
    prop = get_object_or_404(Propriete, id_prop=id_prop)
    prop.delete()
    return Response({"message": "Propriété supprimé avec succès"})


@api_view(["POST"])
def CreateProp(request):
    serializer = ProprieteSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    prop = serializer.data
    return Response(prop)


@api_view(["POST"])
def CreateCopro(request):
    serializer = CoproprieteSerializer(data=request.data)
    if serializer.is_valid():
        copro = serializer.save()
        nbpro = serializer.validated_data.get("nb_props")
        for i in range(nbpro):
            Propriete.objects.create(
                num="prop" + str(i),
                id_user=None,
                occupation=False,
                id_cop=copro,
                id_cot=None,
            )
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response({"message": "Erreur, données saisies invalides !"})


@api_view(["GET"])
def ListCopro(request):
    Copro = Copropriete.objects.all()
    serializer = CoproprieteSerializer(Copro, many=True)
    return Response(serializer.data)


@api_view(["DELETE"])
def DeleteCopro(request, id_cop):
    copro = get_object_or_404(Copropriete, pk=id_cop)
    serializer = CoproprieteSerializer(copro)
    if copro:
        Propriete.objects.filter(id_cop=copro.id_cop).delete()
        copro.delete()
    return Response(
        {"message": "Copropriété supprimé avec succès", "Copropriete": serializer.data}
    )

@api_view(["PATCH"])
def UpdateCopro(request, id_cop):
    if request.method == "PATCH":
        new_data = {
            "name": request.data.get("name"),
            "adresse": request.data.get("adresse"),
            "nb_props": request.data.get("nb_props"),
        }

        coprop = get_object_or_404(Copropriete, id_cop=id_cop)

        serializer = CoproprieteSerializer(coprop, data=new_data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "copropriété modifiée avec succès"})
        return Response(serializer.errors, status=400)

    return Response({"error": "Invalid request method"}, status=400)

@api_view(["GET"])
def ListerDocument(request):
    Docs = Document.objects.all()
    serializer = DocumentSerializer(Docs, many=True)
    return Response(serializer.data)

@api_view(["POST"])
def CreateDocument(request):
    Docs = DocumentSerializer(data=request.data)
    if Docs.is_valid():
        Docs.save()
        return Response(Docs.data)
    else:
        return Response({"message":"Erreur, données saisies invalides !"})
    
@api_view(["DELETE"])
def DeleteDocument(request, id_doc):
    Doc = get_object_or_404(Document,pk=id_doc)
    if Doc :
        Doc.delete()
        return Response({"message":"Document supprimé avec succès !"})
    else :
        return Response({"message":"Document introuvable !"})
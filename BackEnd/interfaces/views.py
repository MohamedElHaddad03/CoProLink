from datetime import timezone
from datetime import datetime
from django.shortcuts import get_object_or_404, render
from dateutil.relativedelta import relativedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Copropriete, Cotisation, Document, Paiement, Depense, Propriete
from rest_framework.decorators import api_view
from django.db.models.functions import ExtractMonth
from interfaces.signals import generer_pdf
from django.views import View
from django.http import HttpResponse
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_decode
from users.models import User
from django.db.models import Sum, Count, Max
from rest_framework import serializers

from .serializers import (
    CoproprieteSerializer,
    CotisationSerializer,
    DepenseSerializer,
    DocumentSerializer,
    MontantTotMoisSerializer,
    PaiementSerializer,
    PaiementStatSerializer,
    ProprieteSerializer,
    ProprieteSerializerUsers,
)
from django.db.models import Sum


class PropPaymentsSerializer(serializers.Serializer):
    id_prop = serializers.IntegerField()
    total_payments = serializers.FloatField()

@api_view(["GET"])
def ListerPaiement(request):
    prop_payments = (
        Paiement.objects
        .filter(etat=False, id_prop__id_cop=request.user.profile.id_cop)
        .values('id_prop')
        .annotate(total_payments=Sum('montant'))
    )

    serializer = PropPaymentsSerializer(prop_payments, many=True)
    return Response({"paiements": serializer.data})

@api_view(["PUT"])
def ValiderPay(request, id_prop, montant_recu):
    # Récupérer la propriété
    propriete = Propriete.objects.get(pk=id_prop)

    # Mettre à jour l'état des anciens paiements à True
    anciens_paiements = Paiement.objects.filter(
    id_prop=propriete,
    etat=False
).order_by('date_creation')
    nb = montant_recu // propriete.id_cot.montant
    count_anciens_paiements = anciens_paiements.count()

    if nb < count_anciens_paiements:
         for paiement in anciens_paiements[:nb]:
            paiement.etat = True
            paiement.save()
    else:
        today = datetime.now().date()
        anciens_paiements.update(date_paiement=today,etat=True)

        nb_prochains_paiements = int(nb - count_anciens_paiements)
        montant_cotisation = propriete.id_cot.montant

        
        first_payment_date = (today + relativedelta(months=1)).replace(day=1)
        for i in range(nb_prochains_paiements):
            payment_date = first_payment_date + relativedelta(months=i)
            Paiement.objects.create(
                montant=montant_cotisation,
                date_creation=payment_date,
                date_paiement=today,
                etat=True,
                id_cot=propriete.id_cot,
                id_prop=propriete
            )
    
    return Response({"message": f"{nb} paiements validés avec succès."})



@api_view(["GET"])
def DepenseList(request):
    # depenses_par_categorie = {
    #     "Assainissement": Depense.objects.filter(categorie="Assainissement"),
    #     "Maintenance et reparation": Depense.objects.filter(
    #         categorie="Maintenance et reparation"
    #     ),
    #     "Matériel": Depense.objects.filter(categorie="Matériel"),
    #     "Gardiennage": Depense.objects.filter(categorie="Gardiennage"),
    #     "Autre": Depense.objects.filter(categorie="Autre"),
    # }

    # serialized_depenses_par_categorie = {
    #     categorie: {
    #         "depenses": DepenseSerializer(depenses, many=True).data,
    #         "montant_total": depenses.aggregate(Sum("montant"))["montant__sum"] or 0,
    #     }
    #     for categorie, depenses in depenses_par_categorie.items()
    # }

    # return Response(serialized_depenses_par_categorie)
    user = request.user
    dep = Depense.objects.filter(id_cop=user.profile.id_cop)
    serializer = DepenseSerializer(dep, many=True)
    return Response(serializer.data)


@api_view(["POST"])
def CreateDepense(request):
    cop = request.user.profile.id_cop
    request.data["id_cop"] = cop.id_cop
    request.data["date_dep"] = datetime.today().date()
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
            "visible": request.data.get("visible"),
            "date_dep": request.data.get("date_dep"),
        }

        depense = get_object_or_404(Depense, id_depense=id_dep)

        serializer = DepenseSerializer(depense, data=new_data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "depense modifiée avec succès"})
        return Response(serializer.errors, status=400)

    return Response({"error": "Invalid request method"}, status=400)

@api_view(["PUT"])
def UpdateProp(request, id_prop):
    prop = Propriete.objects.get(pk=id_prop)
    id_user = request.data.get('id_user')
    occupation = bool(id_user)
    request.data['occupation'] = occupation
    request.data['statut'] = request.data.get('statut', prop.statut)

    serializer = ProprieteSerializer(prop, data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def ListProp(request):
    props = Propriete.objects.all()
    serializer = ProprieteSerializer(props, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def ListPropUsers(request):
    props = Propriete.objects.filter(id_cop=request.user.profile.id_cop)
    serializer = ProprieteSerializerUsers(props, many=True)
    return Response(serializer.data)


@api_view(["DELETE"])
def DeleteProp(request, id_prop):
    prop = get_object_or_404(Propriete, id_prop=id_prop)
    prop.delete()
    return Response({"message": "Propriété supprimé avec succès"})

@api_view(["PUT"])
def depenseVis(request,id_dep):
    depense = Depense.objects.get(pk=id_dep)
    depense.visible = True
    depense.save()
    return Response({"message": "Visibilité de la dépense mise à jour avec succès."})
   
@api_view(["PUT"])
def depenseInvis(request,id_dep):
    depense = Depense.objects.get(pk=id_dep)
    depense.visible = False
    depense.save()
    return Response({"message": "invisibilité de la dépense mise à jour avec succès."})

@api_view(["POST"])
def CreateProp(request):
    serializer = ProprieteSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    prop = serializer.data
    return Response(prop)


def create_cotisation(copro):
    now=datetime.now().date()

    cotisation1 = Cotisation.objects.create(montant=200, type_cot="Normale", id_cop=copro, date_creation=now)
    cotisation2 = Cotisation.objects.create(montant=400, type_cot="Business", id_cop=copro, date_creation=now)
    cotisation3 = Cotisation.objects.create(montant=500, type_cot="Exceptionnelle", id_cop=copro, date_creation=now)

    return [cotisation1, cotisation2, cotisation3]

from datetime import datetime

@api_view(['PUT'])
def update_cotisation(request, pk):
    try:
        cotisation = Cotisation.objects.get(pk=pk)
    except Cotisation.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        now = datetime.now()
        request.data['date_creation'] = now.date()
        serializer = CotisationSerializer(cotisation, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def CreateCopro(request):
    serializer = CoproprieteSerializer(data=request.data)
    utilisateur=request.user
    if serializer.is_valid() and utilisateur.profile.role == "admin":
        copro = serializer.save()
        create_cotisation(copro)
        nbpro = serializer.validated_data.get("nb_props")
        for i in range(nbpro):
            Propriete.objects.create(
                num="prop" + str(i),
                id_user=None,
                occupation=False,
                id_cop=copro,
                id_cot=get_object_or_404(Cotisation,type_cot="Normale", id_cop=copro),
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
    Docs = Document.objects.filter(id_cop=request.user.profile.id_cop)
    serializer = DocumentSerializer(Docs, many=True)
    return Response(serializer.data)


@api_view(["POST"])
def CreateDocument(request):
    Docs = DocumentSerializer(data=request.data)
    if Docs.is_valid():
        Docs.save()
        return Response(Docs.data)
    else:
        return Response({"message": "Erreur, données saisies invalides !"})


@api_view(["DELETE"])
def DeleteDocument(request, id_doc):
    Doc = get_object_or_404(Document, pk=id_doc)
    if Doc:
        Doc.delete()
        return Response({"message": "Document supprimé avec succès !"})
    else:
        return Response({"message": "Document introuvable !"})


@api_view(["GET"])
def ListerPaiementStatsMens(request):
    mois = datetime.now().month
    paiement = Paiement.objects.filter(
        date_creation__month=mois, id_prop__id_cop=request.user.profile.id_cop
    )
    serializer = PaiementStatSerializer(paiement, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def ListerPaiementStatsAnn(request):
    annee = datetime.now().year
    paiement = Paiement.objects.filter(
        date_creation__year=annee, id_prop__id_cop=request.user.profile.id_cop
    )
    serializer = PaiementStatSerializer(paiement, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def ListerPaiementStatsPer(request, prem, sec):
    start_date = datetime.strptime(prem, "%Y-%m-%d")
    end_date = datetime.strptime(sec, "%Y-%m-%d")
    paiement = Paiement.objects.filter(
        date_creation__range=[start_date, end_date],
        id_prop__id_cop=request.user.profile.id_cop,
    )
    serializer = PaiementStatSerializer(paiement, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def ChartPaiement(request):
    annee = datetime.now().year
    montant_per_month = (
        Paiement.objects.annotate(mois=ExtractMonth("date_creation"))
        .values("mois")
        .annotate(montant_total=Sum("montant"))
        .order_by("mois")
        .filter(date_creation__year=annee, id_prop__id_cop=request.user.profile.id_cop)
    )
    serializer = MontantTotMoisSerializer(montant_per_month, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def ChartPaiementPer(request, prem, sec):
    start_date = datetime.strptime(prem, "%Y-%m-%d")
    end_date = datetime.strptime(sec, "%Y-%m-%d")
    montant_per_month = (
        Paiement.objects.annotate(mois=ExtractMonth("date_creation"))
        .values("mois")
        .annotate(montant_total=Sum("montant"))
        .order_by("mois")
        .filter(
            date_creation__range=[start_date, end_date],
            id_prop__id_cop=request.user.profile.id_cop,
        )
    )
    serializer = MontantTotMoisSerializer(montant_per_month, many=True)
    return Response(serializer.data)


class GeneratePDFView(View):
    def get(self, request, paiement_id, uidb64, token):
        uid = urlsafe_base64_decode(uidb64).decode("utf-8")
        user = User.objects.get(pk=uid)

        if default_token_generator.check_token(user, token):
            paiement = Paiement.objects.get(id_pay=paiement_id)
            pdf_buffer = generer_pdf(paiement)

            response = HttpResponse(
                pdf_buffer.getvalue(), content_type="application/pdf"
            )

            response["Content-Disposition"] = f"filename=paiement_{paiement.id_pay}.pdf"

            return response


@api_view(["GET"])
def PieChart(request,annee):
    depenses_par_categorie = {
        "Assainissement": Depense.objects.filter(date_dep__year=annee,categorie="Assainissement",id_cop=request.user.profile.id_cop),
        "Maintenance et reparation": Depense.objects.filter(
            date_dep__year=annee,
            categorie="Maintenance et reparation",
            id_cop=request.user.profile.id_cop,

        ),
        "Matériel": Depense.objects.filter(date_dep__year=annee,categorie="Matériel",id_cop=request.user.profile.id_cop),
        "Gardiennage": Depense.objects.filter(date_dep__year=annee,categorie="Gardiennage",id_cop=request.user.profile.id_cop),
        "Autre": Depense.objects.filter(date_dep__year=annee,categorie="Autre",id_cop=request.user.profile.id_cop),
    }

    serialized_depenses_par_categorie = {
        categorie: {
            "montant_total": depenses.aggregate(Sum("montant"))["montant__sum"] or 0,
        }
        for categorie, depenses in depenses_par_categorie.items()
    }

    return Response(serialized_depenses_par_categorie)


@api_view(["GET"])
def PaiementPerso(request,annee):
    user = request.user
    pay = Paiement.objects.filter(id_prop__id_user=user.id, date_creation__year=annee)
    serializer = PaiementSerializer(pay, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def ListCotisation(request):
    cot= Cotisation.objects.filter(id_cop=request.user.profile.id_cop)
    serializer=CotisationSerializer(cot, many=True)
    return Response(serializer.data)
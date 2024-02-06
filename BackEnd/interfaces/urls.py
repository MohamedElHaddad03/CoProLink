from django.contrib import admin
from django.urls import path
from . import views


urlpatterns = [
    path("paiement/vpay/<int:id_prop>/<int:montant_recu>", views.ValiderPay, name="ValiderPay"),
    path("paiement", views.ListerPaiement, name="ListerPaiement"),
    path("paiementperso/<str:annee>",views.PaiementPerso,name="PaiementPerso"),
    path("stats/paiementmens",views.ListerPaiementStatsMens,name="ListerPaiementStatsMens"),
    path("stats/paiementann",views.ListerPaiementStatsAnn,name="ListerPaiementStatsAnn"),
    path("stats/paiementper/<str:prem>/<str:sec>",views.ListerPaiementStatsPer,name="ListerPaiementStatsPer"),
    path("stats/paiement/chart",views.ChartPaiement,name="ChartPaiement"),
    path("stats/paiement/PieChart/<str:annee>",views.PieChart,name="PieChart"),
    path("stats/paiement/chartPer/<str:prem>/<str:sec>",views.ChartPaiementPer,name="ChartPaiementPer"),
    path("depense", views.DepenseList, name="DepenseList"),
    path("depense/create/", views.CreateDepense, name="DepenseCreate"),
    path("depense/delete/<int:id_dep>", views.DeleteDepense, name="Depensedelete"),
    path("depense/update/<int:id_dep>/", views.DepenseUpdate, name="UpdateDep"),
    path("prop", views.ListProp, name="ListProp"),
    path("propusers", views.ListPropUsers, name="ListPropUsers"),
    path("prop/update/<int:id_prop>", views.UpdateProp, name='UpdateProp'),
    path("prop/create/", views.CreateProp, name="CreateProp"),
    path("prop/delete/<int:id_prop>", views.DeleteProp, name="DeleteProp"),
    path("copro", views.ListCopro, name="ListCopro"),
    path("copro/create/", views.CreateCopro, name="CreateCopro"),
    path("copro/delete/<int:id_cop>", views.DeleteCopro, name="DeleteCopro"),
    path("copro/update/<int:id_cop>/", views.UpdateCopro, name="UpdateCopro"),
    path("Docs", views.ListerDocument, name="ListerDoc"),
    path("Docs/create/", views.CreateDocument, name="CreateDoc"),
    path("Docs/delete/<int:id_doc>/", views.DeleteDocument, name="DeleteDoc"),
    path('generate_pdf/<int:paiement_id>/<uidb64>/<token>/', views.GeneratePDFView.as_view(), name='generate_pdf'),
    path('depense/Vis/<int:id_dep>',views.depenseVis, name="depenseVis"),
    path('depense/Invis/<int:id_dep>',views.depenseInvis, name="depenseInvis"),
    path('cotisation/update/<int:pk>/', views.update_cotisation, name='update_cotisation'),
    path("cotisations", views.ListCotisation, name="ListCotisation"),



]

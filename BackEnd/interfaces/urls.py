from django.contrib import admin
from django.urls import path
from . import views


urlpatterns = [
    path("paiement/vrpay/<int:id_pay>", views.ValiderRejeterPay, name="ValiderRejeter"),
    path("paiement", views.ListerPaiement, name="ListerPaiement"),
    path("depense", views.DepenseList, name="DepenseList"),
    path("depense/create/", views.CreateDepense, name="DepenseCreate"),
    path("depense/delete/<int:id_dep>", views.DeleteDepense, name="Depensedelete"),
    path("depense/update/<int:id_dep>/", views.DepenseUpdate, name="UpdateDep"),
    path("prop", views.ListProp, name="ListProp"),
    path("prop/create/", views.CreateProp, name="CreateProp"),
    path("prop/delete/<int:id_prop>", views.DeleteProp, name="DeleteProp"),
    path("copro", views.ListCopro, name="ListCopro"),
    path("copro/create/", views.CreateCopro, name="CreateCopro"),
    path("copro/delete/<int:id_cop>", views.DeleteCopro, name="DeleteCopro"),
    path("copro/update/<int:id_cop>/",views.UpdateCopro, name="UpdateCopro"),
    path("Docs",views.ListerDocument, name="ListerDoc"),
    path("Docs/create/",views.CreateDocument, name="CreateDoc"),  
    path("Docs/delete/<int:id_doc>/",views.DeleteDocument,name="DeleteDoc"),
]

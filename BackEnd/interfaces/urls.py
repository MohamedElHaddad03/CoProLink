from django.contrib import admin
from django.urls import path
from . import views


urlpatterns = [
    path("paiement/vrpay/<int:id_pay>", views.ValiderRejeterPay, name="ValiderRejeter"),
    path("paiement/depenseList",views.DepenseList, name="DepenseList"),
    path("prop",views.ListProp,name="ListProp"),
    path("prop/create/",views.CreateProp,name="CreateProp"),
    path("prop/delete/<int:id_prop>",views.DeleteProp,name="DeleteProp"),
    path("copro",views.ListCopro,name="ListCopro"),
    path("copro/create/",views.CreateCopro,name="CreateCopro"),
    path("copro/delete/<int:id_cop>",views.DeleteCopro,name="DeleteCopro"),
]

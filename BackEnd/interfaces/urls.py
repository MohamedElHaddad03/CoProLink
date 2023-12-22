from django.contrib import admin
from django.urls import path
from . import views


urlpatterns = [
    path("paiement/vrpay/<int:id_pay>", views.ValiderRejeterPay, name="ValiderRejeter"),
]

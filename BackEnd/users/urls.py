from django.contrib import admin
from django.urls import path
from . import views


urlpatterns = [
    path("<int:pk>/", views.ProfileRetrieveUpdateDestroyView.as_view(), name="RUD"),
    path("", views.List_Users, name="ListUsers"),
    path("login/", views.LoginView.as_view(), name="Login"),
    path("logout/", views.LogoutView.as_view(), name="Logout"),

]

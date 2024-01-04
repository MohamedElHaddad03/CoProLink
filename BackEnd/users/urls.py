from django.contrib import admin
from django.urls import path
from . import views


urlpatterns = [
    path("<int:pk>/", views.ProfileRetrieveUpdateDestroyView.as_view(), name="RUD"),
    path("", views.ProfileListCreateView.as_view(), name="LC"),
    path("signup/",views.signup,name="signup"),
    # path("", views.List_Users, name="ListUsers"),
]

from django.contrib import admin
from django.urls import path
from . import views


urlpatterns = [
    path('users/<int:pk>/', views.ProfileRetrieveUpdateDestroyView.as_view(), name='RUD'),
    path('',views.List_Users,name='ListUsers'),
   

    
]



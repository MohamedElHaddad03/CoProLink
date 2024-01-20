"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib.auth import views as auth_views
from django.contrib import admin
from django.urls import path
from django.urls import include
from users import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/users/", include("users.urls")),
    path("api/interfaces/", include("interfaces.urls")),
    path("login/", views.LoginView.as_view(), name="Login"),
    path("logout/", views.LogoutView.as_view(), name="Logout"),
    path("mailverif/<str:email>", views.valider_email_unique, name="mailverif"),
    path("activation/<uidb64>/<token>/",views.activation_compte,name="activation"),
    path("reset/<uidb64>/<token>/", auth_views.PasswordResetConfirmView.as_view(template_name="password_reset.html"),name="password_reset"),
    path("reset/done/",auth_views.PasswordResetCompleteView.as_view(template_name="password_reset_done.html"),name="password_reset_complete"),
    path("forgot/<str:email>/",views.mdp_oublie,name="ChangerMdp"),

]

from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.template.loader import render_to_string
import logging
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode

logger = logging.getLogger(__name__)


@receiver(post_save, sender=User)
def send_password_reset_link(sender, instance, created, **kwargs):
    if created:
        uid = urlsafe_base64_encode(force_bytes(instance.pk))
        token = default_token_generator.make_token(instance)
        lien = f"http://192.168.1.156:8000/reset/{uid}/{token}/"
        message1 = "Bienvenue à notre application !"
        message2 = "Voici votre Username ou Nom d'utilisateur :" + str(
            instance.username
        )
        message3 = "Il est nécessaire de changer votre mot de passe lors de votre première visite, veuillez cliquer sur le bouton au dessous :"
        message4 = "Réinitialiser MDP"
        subject = "CoProLink-Changement de mot de passe"
        html_message = render_to_string(
            "email.html",
            {
                "message1": message1,
                "message2": message2,
                "message3": message3,
                "message4": message4,
                "lien": lien,
            },
        )
        send_mail(
            subject,
            "",
            "elbaghdadinada5@gmail.com",
            [instance.email],
            html_message=html_message,
        )


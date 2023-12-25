from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
import logging

logger = logging.getLogger(__name__)


@receiver(post_save, sender=User)
def send_password_reset_link(sender, instance, created, **kwargs):
    if created:
        subject = 'CoProLink-Changement de mot de passe'
        message = f"Bonjour,\n\nBienvenu à notre application ! \n\n Voici votre Username ou Nom d'utilisateur : {instance.username} \n\n Il est nécessaire de changer votre mot de passe lors de votre première visite, veuillez cliquer sur le lien affiché au niveau du Login 'Mot de passe oublié ?'.\n\n "
        send_mail(subject, message, 'elbaghdadinada5@gmail.com', [instance.email])

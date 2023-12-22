import time
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from datetime import timedelta
from .models import Propriete, Paiement, Cotisation
from django.contrib.auth.models import User
from django.db.models.signals import pre_save,post_save
from django.dispatch import receiver
from django.utils import timezone
from schedule import every, run_pending
import schedule
import threading

@receiver(
    post_save, sender=User
)  # y3ni apres une instance du modele Propriete dyalna, le signal va etre declenché
def PaiementMensuel(sender, instance, **kwargs):
    if kwargs.get('created'):
        CreerPaiement(instance)

def CreerPaiement(instance):
    today = timezone.now()
    current_month = today.month
    current_year = today.year
    existing_payment = Paiement.objects.filter(
            id_prop=instance,
            date_creation__month=current_month,
            date_creation__year=current_year,
        ).exists()
    if not existing_payment:
        coti=instance.id_cot
        cotisation = Cotisation.objects.get(id_cot=coti.id_cot)
        new_payment = Paiement.objects.create(
            montant=cotisation.montant,
            date_creation=today,
            date_paiement=None,
            etat=False,
            id_cot=coti,
            id_prop=instance,
        )
        



def AutogenPayement():
    propriete_instances = Propriete.objects.all()
    for instance in propriete_instances:
        CreerPaiement(instance)

def tache_planif():
    schedule.every(31).days.do(AutogenPayement)
    while True:
        schedule.run_pending()
        time.sleep(1)


# threading.Thread(target=tache_planif).start()


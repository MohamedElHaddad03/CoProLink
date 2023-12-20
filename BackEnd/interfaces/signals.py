from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from datetime import timedelta
from .models import Propriete, Paiement, Cotisation
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.utils import timezone


@receiver(
    pre_save, sender=Propriete
)  # y3ni apres une instance du modele Propriete dyalna, le signal va etre declenché
def PaiementMensuel(sender, instance, **kwargs):
    if kwargs.get('created'):
        today = timezone.now()
        current_month = today.month
        current_year = today.year

        existing_payment = Paiement.objects.filter(
            id_prop=instance,
            date_creation__month=current_month,
            date_creation__year=current_year,
        ).exists()

        if not existing_payment:
            cotisation = Cotisation.objects.get(id_cot=instance.id_cot)

            new_payment = Paiement.objects.create(
                montant=cotisation.montant,
                date_creation=today,
                date_paiement=None,
                etat=False,
                id_cot=cotisation,
                id_prop=instance,
            )

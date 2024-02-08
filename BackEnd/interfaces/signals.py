import time
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from datetime import timedelta
from rest_framework.decorators import api_view
from .models import Propriete, Paiement, Cotisation
from django.contrib.auth.models import User
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from django.utils import timezone
from schedule import every, run_pending
from reportlab.lib.pagesizes import letter
import schedule
import threading
from django.http import HttpResponse
from reportlab.pdfgen import canvas
from io import BytesIO
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    Image,
)
from io import BytesIO
from django.core.mail import send_mail
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.template.loader import render_to_string
from weasyprint import HTML

""" 
@receiver(
    post_save, sender=Paiement
)  
def GenerationRecu(sender, instance, **kwargs):
    
    if instance.etat == 1 :
        print(instance.id_prop.id_user.id)
        pdf_buffer = generer_pdf(instance) 
        uid = urlsafe_base64_encode(force_bytes(instance.id_prop.id_user.id))
        token = default_token_generator.make_token(instance.id_prop.id_user)
        lien = f"http://16.171.140.68:8000/api/interfaces/generate_pdf/{instance.id_pay}/{uid}/{token}/"
        subject = 'Reçu de paiement'
        message1 = "Bienvenue à notre application !"
        message2 = "Votre paiement a bien été validé !"
        message3 = "Vous pouvez voir votre reçu de facture concernant votre cotisation mensuelle en cliquant sur le bouton en dessous :"
        message4 = "CONSULTER"
        
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
            "noreplycoprolink@gmail.com",
            [instance.id_prop.id_user.email],
            html_message=html_message,
        )
            
def generer_pdf(paiement):
    buffer = BytesIO()

    p = SimpleDocTemplate(buffer, pagesize=letter)

    styles = getSampleStyleSheet()

    header_table_data = [
        [Image("templates/Logo.png", 100, 100)],
        ["Reçu de Paiement de Cotisation"],
    ]

    header_table_style = [
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('RIGHTPADDING', (0, 0), (0, -1),250), 
    ]

    header_table = Table(header_table_data)
    header_table.setStyle(TableStyle(header_table_style))

    information_table_data = [
        [ 'Payé le :', str(paiement.date_paiement)],
        ['Facturée à :', paiement.id_prop.id_user.get_full_name()],
        ['Résidant à :', paiement.id_prop.num],
        
    ]

    information_table_style = [
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (0, -1), 500), 
        ('RIGHTPADDING', (1, 0), (1, -1), 270),    
        ]
    
    information_table = Table(information_table_data)
    information_table.setStyle(TableStyle(information_table_style))

    items_data = [
        ['Description', 'Montant'],
        ['Cotisation Mensuelle du Syndic', f'{paiement.montant}MAD'],
    ]

    items_table_style = [
        ('GRID', (0, 0), (-1, -1), 1, colors.black),
        ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
        ('ALIGN', (1, 0), (-1, -1), 'RIGHT'),
        
    ]

    items_table = Table(items_data,rowHeights=[20,30], colWidths=[200, 100])
    items_table.setStyle(TableStyle(items_table_style))

    total_table_style = [
        ('ALIGN', (1, 0), (-1, -1), 'RIGHT'),
        ('LEFTPADDING', (0, 0), (0, -1), 210), 
        
    ]
    total_data = [['', f'Total: {paiement.montant}MAD']]

    total_table = Table(total_data)
    total_table.setStyle(TableStyle(total_table_style))


    elements = [
        Spacer(1, 30),
        header_table,
        Spacer(1, 20),
        information_table,
        Spacer(1, 20),
        items_table,
        Spacer(1, 20),
        total_table,
    ]

    p.build(elements)

    buffer.seek(0)

    return buffer
 """


@receiver(post_save, sender=Paiement)
def generation_recu(sender, instance, **kwargs):
    if instance.etat == 1 and not instance.mail_envoye:
        valider_paiements = Paiement.objects.filter(date_paiement=instance.date_paiement,id_prop=instance.id_prop)
        valider_paiements.update(mail_envoye=True)
        user_id = instance.id_prop.id_user.id
        uid = urlsafe_base64_encode(force_bytes(user_id))
        token = default_token_generator.make_token(instance.id_prop.id_user)
        lien = f"http://127.0.0.1:8000/api/interfaces/generate_pdf/{instance.id_pay}/{uid}/{token}/"
        subject = "Reçu de paiement"
        message1 = "Bienvenue à notre application !"
        message2 = "Votre paiement a bien été validé !"
        message3 = "Vous pouvez voir votre reçu de facture concernant votre cotisation mensuelle en cliquant sur le bouton en dessous :"
        message4 = "CONSULTER"

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
            "noreplycoprolink@gmail.com",
            [instance.id_prop.id_user.email],
            html_message=html_message,
        )



def generer_pdf(paiement):
    paiements = Paiement.objects.filter(date_paiement=paiement.date_paiement,id_prop=paiement.id_prop)
    html_string = render_to_string("recu_paiement.html", {"paiement": paiements})
    pdf = HTML(string=html_string).write_pdf()
    response = HttpResponse(pdf, content_type="application/pdf")
    response["Content-Disposition"] = 'filename="reçu.pdf"'
    return response


@receiver(
    post_save, sender=Propriete
)  # y3ni apres une instance du modele Propriete dyalna, le signal va etre declenché
def PaiementMensuel(sender, instance, **kwargs):
    if kwargs.get("created"):
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
    if not existing_payment and instance.id_cot is not None:
        coti = instance.id_cot
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

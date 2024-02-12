# Generated by Django 4.2.6 on 2024-02-12 20:45

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('interfaces', '0007_paiement_mail_envoye'),
    ]

    operations = [
        migrations.AlterField(
            model_name='propriete',
            name='id_user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='propriete',
            name='statut',
            field=models.CharField(choices=[('proprietaire', 'proprietaire'), ('locataire', 'locataire')], default='proprietaire', max_length=30),
        ),
    ]

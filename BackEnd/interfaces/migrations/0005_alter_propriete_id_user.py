# Generated by Django 4.2.6 on 2024-02-01 20:36

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('interfaces', '0004_alter_propriete_id_cot_alter_propriete_id_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='propriete',
            name='id_user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
    ]
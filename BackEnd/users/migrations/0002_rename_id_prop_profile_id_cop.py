# Generated by Django 5.0 on 2023-12-21 23:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='profile',
            old_name='id_prop',
            new_name='id_cop',
        ),
    ]
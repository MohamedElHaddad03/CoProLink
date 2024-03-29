from django.db import models
from django.contrib.auth.models import User
from interfaces.models import Copropriete
from django.contrib.auth.hashers import make_password
# Create your models here.

ROLE = [
    ('admin', 'admin'),
    ('proprietaire', 'proprietaire'),
    ('syndic', 'syndic'),
]

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    cin = models.CharField(max_length=10, null=True)
    telephone = models.CharField(max_length=14,unique=True)
    role = models.CharField(max_length=15,choices=ROLE)
    id_cop = models.ForeignKey(Copropriete, on_delete=models.CASCADE,null=True)

    def save(self, *args, **kwargs):
        if self.role.lower() == 'admin':
            self.user.is_superuser = True
            self.user.is_staff = True

        super(Profile, self).save(*args, **kwargs)

    def _str__(self):
        return self.user.get_full_name
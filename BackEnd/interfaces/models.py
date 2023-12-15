from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Copropriete(models.Model):
    id_cop = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    adresse = models.CharField(max_length=255)
    nb_props = models.IntegerField()

    def __str__(self):
        return self.name
    
class Document(models.Model):
    id_docu = models.AutoField(primary_key=True)
    nomdoc = models.CharField(max_length=50)
    url = models.CharField(max_length=255)
    id_cop = models.ForeignKey(Copropriete, on_delete=models.CASCADE)

    def __str__(self):
        return f"Document {self.id_docu} - CoPropriété {self.id_cop}"
    
CATEGORIE = [
    ('Assainissement', 'Assainissement'),
    ('Maintenance et reparation', 'Maintenance et reparation'),
    ('Matériel', 'Matériel'),
    ('Gardiennage', 'Gardiennage'),
    ('Autre', 'Autre'),
]
    
class Depense(models.Model):
    id_depense = models.AutoField(primary_key=True)
    categorie = models.CharField(max_length=40, choices=CATEGORIE)
    description = models.CharField(max_length=255)
    montant = models.FloatField()
    date_dep = models.DateField()
    id_cop = models.ForeignKey(Copropriete, on_delete=models.CASCADE)

TYPE = [
    ('Normale', 'Normale'),
    ('Business', 'Business'),
    ('Exceptionnelle', 'Exceptionnelle'),
]

class Cotisation(models.Model):
    id_cot = models.AutoField(primary_key=True)
    type_cot = models.CharField(max_length=30,choices=TYPE) 
    montant = models.FloatField()
    date_creation = models.DateField()
    id_cop = models.ForeignKey(Copropriete, on_delete=models.CASCADE)


class Propriete(models.Model):
    id_prop = models.AutoField(primary_key=True)
    num = models.CharField(max_length=10)
    CIN = models.ForeignKey(User, on_delete=models.CASCADE)  
    occupation = models.BooleanField(default=False)
    id_cot = models.ForeignKey(Cotisation, on_delete=models.CASCADE)
    id_cop = models.ForeignKey(Copropriete, on_delete=models.CASCADE)


class Paiement(models.Model):
    id_pay = models.AutoField(primary_key=True)
    montant = models.FloatField()
    date_creation = models.DateField()
    date_paiement = models.DateField()
    etat = models.BooleanField(default=False)
    id_cot = models.ForeignKey(Cotisation, on_delete=models.CASCADE) 
    id_prop = models.ForeignKey(Propriete, on_delete=models.CASCADE)  

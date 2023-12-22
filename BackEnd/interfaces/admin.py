from django.contrib import admin
from .models import Copropriete, Cotisation, Paiement, Propriete, Document, Depense

# Register your models here.

admin.site.register(Copropriete)
admin.site.register(Cotisation)
admin.site.register(Paiement)
admin.site.register(Propriete)
admin.site.register(Document)
admin.site.register(Depense)

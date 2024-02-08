from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
from django.conf import settings

from interfaces.models import Propriete
from interfaces.signals import CreerPaiement

def AutogenPayement():
    propriete_instances = Propriete.objects.all()
    for instance in propriete_instances:
        CreerPaiement(instance)

def start():
    
    scheduler = BackgroundScheduler()
    scheduler.add_job(
        AutogenPayement,
        trigger=CronTrigger(day='1', hour='0', minute='0'), 
        id="my_scheduled_job_666", 
        max_instances=1,
        replace_existing=True,
    )
    scheduler.start()

    print("Scheduler started...", flush=True)

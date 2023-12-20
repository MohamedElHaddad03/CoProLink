from django.apps import AppConfig


class InterfacesConfig(AppConfig):
    default_auto_field = None
    name = 'interfaces'


def ready(self):
    import interfaces.signals 
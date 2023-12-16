from django.apps import AppConfig


class baseConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "base"

    def ready(self):
            import base.signals
from django.contrib import admin

from .models import Note, Calendar, Event, UserProfile, Client, Shipment

admin.site.register(Note)
admin.site.register(Calendar)
admin.site.register(Event)
admin.site.register(UserProfile)
admin.site.register(Client)
admin.site.register(Shipment)
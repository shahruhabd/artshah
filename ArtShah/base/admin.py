from django.contrib import admin

from .models import Note, Calendar, Event, UserProfile

admin.site.register(Note)
admin.site.register(Calendar)
admin.site.register(Event)
admin.site.register(UserProfile)
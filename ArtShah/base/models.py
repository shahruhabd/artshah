from django.db import models
from django.contrib.auth.models import User
from django.db.models import JSONField


class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    body = models.TextField()


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=20, blank=True)
    photo = models.ImageField(upload_to='profile_photos/', blank=True, null=True)
    position = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.user.username

class Calendar(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Event(models.Model):
    calendar = models.ForeignKey(Calendar, on_delete=models.CASCADE, related_name='events')
    name = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()
    details = JSONField(blank=True, null=True) 

    def __str__(self):
        return f"{self.name} ({self.start_date} - {self.end_date})"
    

class Client(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Shipment(models.Model):
    IN_TRANSIT = 'в пути'
    DELIVERED = 'доставлено'
    DELAYED = 'задержано'

    STATUS_CHOICES = [
        (IN_TRANSIT, 'В пути'),
        (DELIVERED, 'Доставлено'),
        (DELAYED, 'Задержано'),
    ]
    
    sender = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='sent_shipments')
    recipient = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='received_shipments')
    departure_address = models.CharField(max_length=255)
    delivery_address = models.CharField(max_length=255)
    departure_date = models.DateField()
    expected_delivery_date = models.DateField()
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default=IN_TRANSIT)

    def __str__(self):
        return f'Отгрузка от {self.departure_address} до {self.delivery_address}'

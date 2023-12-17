from rest_framework.serializers import ModelSerializer
from base.models import Calendar, Event, UserProfile, Client, Shipment
from django.contrib.auth.models import User

class CalendarSerializer(ModelSerializer):
    class Meta:
        model = Calendar
        fields = '__all__'

class EventSerializer(ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class UserProfileSerializer(ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['phone_number', 'photo', 'position']

class UserSerializer(ModelSerializer):
    profile = UserProfileSerializer(source='userprofile', required=False)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'profile']

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('userprofile', {})
        profile = instance.userprofile

        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)
        instance.save()

        profile.phone_number = profile_data.get('phone_number', profile.phone_number)
        if 'photo' in profile_data:
            profile.photo = profile_data['photo']
        profile.save()

        return instance
    

class ClientsSerializer(ModelSerializer):
    class Meta:
        model = Client
        fields = ['id', 'name']

class ShipmentSerializer(ModelSerializer):
    class Meta:
        model = Shipment
        fields = ['id', 'sender', 'recipient', 'departure_address', 'delivery_address', 'departure_date', 'expected_delivery_date', 'status']

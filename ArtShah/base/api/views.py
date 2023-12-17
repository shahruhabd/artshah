from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.views import APIView
from rest_framework import status
from rest_framework import viewsets
from rest_framework import generics, permissions
from django.db.models.signals import post_save
from django.dispatch import receiver


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from ..permissions import IsAdminUser

from .serializers import CalendarSerializer, EventSerializer, UserProfileSerializer, UserSerializer, ClientsSerializer, ShipmentSerializer
from base.models import Calendar, Event, UserProfile, Client, Shipment

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username

        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
        '/api/calendars',
        '/api/events',
        '/api/profiles',
        '/api/clients',
        '/api/shipments',
    ]

    return Response(routes)




class UserCreate(APIView):
    permission_classes = [IsAdminUser]
    

class CalendarViewSet(viewsets.ModelViewSet):
    queryset = Calendar.objects.all()
    serializer_class = CalendarSerializer


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer 

class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetailView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        pk = self.kwargs.get('pk')
        return generics.get_object_or_404(User, pk=pk)

@api_view(['POST'])
def delete_profile_photo(request, pk):
    userprofile = request.user.userprofile
    userprofile.photo.delete(save=True)
    return Response(status=status.HTTP_204_NO_CONTENT)

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientsSerializer

class ShipmentViewSet(viewsets.ModelViewSet):
    queryset = Shipment.objects.all()
    serializer_class = ShipmentSerializer
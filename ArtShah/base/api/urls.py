from django.urls import path 
from . import views 
from .views import MyTokenObtainPairView, CalendarViewSet, EventViewSet, UserListView, UserDetailView
from rest_framework.routers import DefaultRouter

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

router = DefaultRouter()
router.register(r'calendars', CalendarViewSet)
router.register(r'events', EventViewSet)
urlpatterns = [
    path('', views.getRoutes),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('users/', UserListView.as_view(), name='user-list'),
    path('profiles/<int:pk>/', UserDetailView.as_view(), name='user-profile-detail'),
    path('profiles/<int:pk>/delete_photo/', views.delete_profile_photo, name='delete-profile-photo'),
] + router.urls
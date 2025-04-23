from django.urls import path
from . import views

urlpatterns = [
    path(
        "availability/", views.get_parking_availability, name="get_parking_availability"
    ),
]

from django.urls import path
from .views import get_traffic_prediction

urlpatterns = [
    path("predict-traffic/", get_traffic_prediction, name="predict_traffic"),
]

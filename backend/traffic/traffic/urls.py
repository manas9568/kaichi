from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("congestion.urls")),
    path("predict/", include("parking.urls")),
    path("traffic/", include("traffic_predictor.urls")),
]

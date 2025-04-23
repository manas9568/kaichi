from django.http import JsonResponse
from .ml_utils import predict_parking_availability
import random


def get_parking_availability(request):
    try:
        # Extract query parameters from the request
        temperature = float(request.GET.get("temperature", 25.0))
        time_label = request.GET.get("time_label", "Morning")
        day_type = request.GET.get("day_type", "Weekday")

        # Generate random values for current_vehicles and incoming_vehicles
        current_vehicles = random.randint(60, 135)  # Random between 60 and 135
        incoming_vehicles = random.randint(5, 30)  # Random between 5 and 30

        # Get prediction from the parking model
        available_slots = predict_parking_availability(
            current_vehicles, incoming_vehicles, temperature, time_label, day_type
        )

        # Return the available slots in the response
        return JsonResponse(
            {"available_slots": round(available_slots, 2)}
        )  # Rounded to two decimal places
    except Exception as e:
        # Return an error response if an exception occurs
        return JsonResponse({"error": str(e)}, status=400)

# congestion/views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .ml_utils import predict_traffic


@csrf_exempt
def predict_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            required_fields = [
                "checkpoint",
                "hour",
                "weather_alert",
                "special_day",
                "weekend",
            ]
            if not all(field in data for field in required_fields):
                return JsonResponse({"error": "Missing fields"}, status=400)

            result = predict_traffic(data)
            return JsonResponse(result, status=200)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Only POST allowed"}, status=405)

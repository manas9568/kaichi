from django.http import JsonResponse
from .ml_utils import predict_traffic


def get_traffic_prediction(request):
    try:
        location = request.GET.get("location")  # delhi, noida, gurgaon
        feature_1 = float(request.GET.get("feature1"))
        feature_2 = float(request.GET.get("feature2"))
        feature_3 = float(request.GET.get("feature3"))

        prediction = predict_traffic(location, [feature_1, feature_2, feature_3])
        return JsonResponse({"location": location, "predicted_congestion": prediction})

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

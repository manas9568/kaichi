import os
import joblib

# Path to current directory: traffic_predictor/
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATHS = {
    "delhi": os.path.join(CURRENT_DIR, "traffic_model_delhi.pkl"),
    "noida": os.path.join(CURRENT_DIR, "traffic_model_noida.pkl"),
    "gurgaon": os.path.join(CURRENT_DIR, "traffic_model_gurgaon.pkl"),
}

# Load all models
MODELS = {city: joblib.load(path) for city, path in MODEL_PATHS.items()}


def predict_traffic(city, features):
    model = MODELS.get(city.lower())
    if not model:
        raise ValueError(f"No model found for city: {city}")
    return model.predict([features])[0]

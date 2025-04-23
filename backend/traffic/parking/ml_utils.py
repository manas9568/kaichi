import joblib
import pandas as pd
import os

# Define the correct path for the model files in the parking app
MODEL_DIR = os.path.dirname(__file__)  # This will give the path to the 'parking' app

# Load the parking model and column structure from the parking app directory
parking_model = joblib.load(os.path.join(MODEL_DIR, "parking_regression_model.pkl"))
parking_columns = joblib.load(os.path.join(MODEL_DIR, "parking_regression_columns.pkl"))


def predict_parking_availability(
    current_vehicles, incoming_vehicles, temperature, time_label, day_type
):
    # Prepare the input data in the correct format
    input_data = pd.DataFrame(
        [
            {
                "current_vehicles": current_vehicles,
                "incoming_vehicles": incoming_vehicles,
                "temperature": temperature,
                "time_label_Morning": 1 if time_label == "Morning" else 0,
                "time_label_Afternoon": 1 if time_label == "Afternoon" else 0,
                "time_label_Evening": 1 if time_label == "Evening" else 0,
                "time_label_Night": 1 if time_label == "Night" else 0,
                "day_type_Weekday": 1 if day_type == "Weekday" else 0,
                "day_type_Weekend": 1 if day_type == "Weekend" else 0,
                "day_type_Holiday": 1 if day_type == "Holiday" else 0,
            }
        ]
    )

    # Ensure the input data has the same columns as the model was trained on
    input_data = input_data[
        parking_columns
    ]  # This will reorder and fill missing columns with 0

    # Make the prediction using the loaded model
    available_slots = parking_model.predict(input_data)
    return round(available_slots[0])

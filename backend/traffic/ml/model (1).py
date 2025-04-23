import os
import joblib
import pandas as pd
import numpy as np
import random
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.model_selection import train_test_split

# Config
TOTAL_CAPACITY = 150
random.seed(42)
np.random.seed(42)

# Simulate training data
n_samples = 2000
data = []

for _ in range(n_samples):
    hour = random.randint(0, 23)
    temp = round(random.uniform(15, 35), 1)
    day_type = random.choice(["Weekday", "Weekend", "Holiday"])
    time_of_day = f"{hour}:{random.randint(0, 59):02d}"

    # Simulated current and incoming vehicles
    current_vehicles = random.randint(60, 135)
    incoming_vehicles = random.randint(5, 30)

    time_label = (
        "Morning" if 5 <= hour < 12 else
        "Afternoon" if 12 <= hour < 17 else
        "Evening" if 17 <= hour < 21 else
        "Night"
    )

    # True available slots
    true_available = TOTAL_CAPACITY - (current_vehicles + incoming_vehicles)
    true_available = max(0, min(true_available, TOTAL_CAPACITY))

    data.append([current_vehicles, incoming_vehicles, temp, time_label, day_type, true_available])

# Create DataFrame
df = pd.DataFrame(data, columns=[
    "current_vehicles", "incoming_vehicles", "temperature", "time_label", "day_type", "available_slots"
])

# Encode categorical variables
df_encoded = pd.get_dummies(df, columns=["time_label", "day_type"], drop_first=True)

X = df_encoded.drop(columns=["available_slots"])
y = df_encoded["available_slots"]

# Ensure the model directory exists
model_dir = "parking_predictor/ml_model"
os.makedirs(model_dir, exist_ok=True)

# Save column structure for use in prediction
joblib.dump(X.columns.tolist(), os.path.join(model_dir, "parking_regression_columns.pkl"))

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = GradientBoostingRegressor()
model.fit(X_train, y_train)

# Save model
joblib.dump(model, os.path.join(model_dir, "parking_regression_model.pkl"))

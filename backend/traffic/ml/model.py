# train_model.py
import pandas as pd
import numpy as np
import random
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingClassifier, GradientBoostingRegressor

# Function to create time label
def generate_time_label(hour):
    if 5 <= hour < 12:
        return "Morning"
    elif 12 <= hour < 17:
        return "Afternoon"
    elif 17 <= hour < 21:
        return "Evening"
    else:
        return "Night"

# Simulated ETA generator
def simulate_eta(distance, congestion):
    base_speed = 0.8  # speed factor to get approximate base time
    base_time = distance / base_speed  # More distance → more base time

    congestion_factor = {"Low": 10, "Medium": 30, "High": 60}[congestion]
    noise = random.randint(-5, 5)
    return int(base_time + congestion_factor + noise)

# Distance mapping from checkpoints
checkpoint_distances = {
    "Kathgodam": 37.0,
    "Nainital": 19.6,
    "Bhowali": 8.2
}

# Data Generation
np.random.seed(42)
n_samples = 3000
records = []

for _ in range(n_samples):
    checkpoint = random.choice(list(checkpoint_distances.keys()))
    distance_from_destination = checkpoint_distances[checkpoint]
    hour = random.randint(0, 23)
    time_label = generate_time_label(hour)
    weather_alert = random.choice([0, 1])
    special_day = random.choice([0, 1])
    weekend = random.choice([0, 1])

    # Congestion determination logic
    if (special_day or weekend) and weather_alert and (10 <= hour <= 13 or 16 <= hour <= 19):
        congestion = "High"
    elif (special_day or weekend or weather_alert):
        congestion = "Medium"
    else:
        congestion = "Low"

    eta = simulate_eta(distance_from_destination, congestion)

    records.append([
        distance_from_destination, hour, time_label,
        weather_alert, special_day, weekend,
        congestion, eta
    ])

# Column names
columns = [
    "distance_from_destination", "hour", "time_label",
    "weather_alert", "special_day", "weekend",
    "congestion", "eta"
]

df = pd.DataFrame(records, columns=columns)

# Classification Model
df_clf = pd.get_dummies(df.copy(), columns=["time_label"], drop_first=True)
X_clf = df_clf.drop(columns=["congestion", "eta"])
y_clf = df_clf["congestion"]

clf = GradientBoostingClassifier()
clf.fit(X_clf, y_clf)

# Regression Model
congestion_to_delay = {"Low": 10, "Medium": 30, "High": 60}
df_reg = df.copy()
df_reg["traffic_delay"] = df_reg["congestion"].map(congestion_to_delay)
df_reg = df_reg.drop(columns=["congestion", "time_label"])
X_reg = df_reg.drop(columns=["eta"])
y_reg = df_reg["eta"]

reg = GradientBoostingRegressor()
reg.fit(X_reg, y_reg)

# Save models and metadata
joblib.dump(clf, "clf_model.pkl")
joblib.dump(reg, "reg_model.pkl")
joblib.dump(X_clf.columns.tolist(), "clf_columns.pkl")
joblib.dump(X_reg.columns.tolist(), "reg_columns.pkl")
joblib.dump(congestion_to_delay, "congestion_mapping.pkl")
joblib.dump(checkpoint_distances, "checkpoint_distances.pkl")

print("✅ Models trained and saved using distance as input.")
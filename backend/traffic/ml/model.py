# train_model.py
import pandas as pd
import numpy as np
import random
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingClassifier, GradientBoostingRegressor

def generate_time_label(hour):
    if 5 <= hour < 12:
        return "Morning"
    elif 12 <= hour < 17:
        return "Afternoon"
    elif 17 <= hour < 21:
        return "Evening"
    else:
        return "Night"

def simulate_eta(checkpoint, congestion):
    base_time = {"Kathgodam": 40, "Bhimtal": 60, "Bhowali": 80}[checkpoint]
    congestion_factor = {"Low": 10, "Medium": 30, "High": 60}[congestion]
    noise = random.randint(-5, 5)
    return base_time + congestion_factor + noise

# Generate Data
np.random.seed(42)
n_samples = 3000
records = []
for _ in range(n_samples):
    checkpoint = random.choice(["Kathgodam", "Bhimtal", "Bhowali"])
    hour = random.randint(0, 23)
    time_label = generate_time_label(hour)
    weather_alert = random.choice([0, 1])
    special_day = random.choice([0, 1])
    weekend = random.choice([0, 1])

    if (special_day or weekend) and weather_alert and (10 <= hour <= 13 or 16 <= hour <= 19):
        congestion = "High"
    elif (special_day or weekend or weather_alert):
        congestion = "Medium"
    else:
        congestion = "Low"

    eta = simulate_eta(checkpoint, congestion)
    records.append([checkpoint, hour, time_label, weather_alert, special_day, weekend, congestion, eta])

columns = ["checkpoint", "hour", "time_label", "weather_alert", "special_day", "weekend", "congestion", "eta"]
df = pd.DataFrame(records, columns=columns)

# Prepare Classification
df_clf = pd.get_dummies(df.copy(), columns=["checkpoint", "time_label"], drop_first=True)
X_clf = df_clf.drop(columns=["congestion", "eta"])
y_clf = df_clf["congestion"]
clf = GradientBoostingClassifier()
clf.fit(X_clf, y_clf)

# Prepare Regression
congestion_to_delay = {'Low': 10, 'Medium': 30, 'High': 60}
df_reg = df.copy()
df_reg["traffic_delay"] = df_reg["congestion"].map(congestion_to_delay)
df_reg = df_reg.drop(columns=["congestion", "time_label"])
df_reg = pd.get_dummies(df_reg, columns=["checkpoint"], drop_first=True)
X_reg = df_reg.drop(columns=["eta"])
y_reg = df_reg["eta"]
reg = GradientBoostingRegressor()
reg.fit(X_reg, y_reg)

# Save everything
joblib.dump(clf, "clf_model.pkl")
joblib.dump(reg, "reg_model.pkl")
joblib.dump(X_clf.columns.tolist(), "clf_columns.pkl")
joblib.dump(X_reg.columns.tolist(), "reg_columns.pkl")
joblib.dump(congestion_to_delay, "congestion_mapping.pkl")

print("Models saved.")
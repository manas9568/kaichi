# congestion/ml_utils.py
import joblib
import os
import pandas as pd

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ML_DIR = os.path.join(BASE_DIR, "ml")

# Load models and columns
clf_model = joblib.load(os.path.join(ML_DIR, "clf_model.pkl"))
reg_model = joblib.load(os.path.join(ML_DIR, "reg_model.pkl"))
clf_columns = joblib.load(os.path.join(ML_DIR, "clf_columns.pkl"))
reg_columns = joblib.load(os.path.join(ML_DIR, "reg_columns.pkl"))
congestion_mapping = joblib.load(os.path.join(ML_DIR, "congestion_mapping.pkl"))


def generate_time_label(hour):
    if 5 <= hour < 12:
        return "Morning"
    elif 12 <= hour < 17:
        return "Afternoon"
    elif 17 <= hour < 21:
        return "Evening"
    else:
        return "Night"


def predict_traffic(data):
    df = pd.DataFrame([data])
    df["time_label"] = df["hour"].apply(generate_time_label)

    # Classification prediction
    clf_input = pd.get_dummies(
        df.copy(), columns=["checkpoint", "time_label"], drop_first=True
    )
    clf_input = clf_input.reindex(columns=clf_columns, fill_value=0)
    congestion_pred = clf_model.predict(clf_input)[0]

    # Regression prediction
    delay = congestion_mapping[congestion_pred]
    reg_input = df.drop(columns=["time_label"])
    reg_input["traffic_delay"] = delay
    reg_input = pd.get_dummies(reg_input, columns=["checkpoint"], drop_first=True)
    reg_input = reg_input.reindex(columns=reg_columns, fill_value=0)
    eta = reg_model.predict(reg_input)[0]

    return {
        "congestion": congestion_pred,
        "eta_minutes": int(eta),
        "delay_minutes": delay,
    }

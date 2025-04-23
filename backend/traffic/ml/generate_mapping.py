import joblib

congestion_mapping = {"Low": 10, "Medium": 30, "High": 60}

joblib.dump(congestion_mapping, "congestion_mapping.pkl")
print("congestion_mapping.pkl saved.")

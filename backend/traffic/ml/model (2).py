import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_squared_error
import pickle

# Step 1: Load the dataset
df = pd.read_csv("noida.csv")

# Step 2: Features and target
X = df.drop("traffic_from_noida", axis=1)
y = df["traffic_from_noida"]

# Step 3: Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Step 4: Gradient Boosting Model training
model = GradientBoostingRegressor(n_estimators=200, learning_rate=0.1, max_depth=5, random_state=42)
model.fit(X_train, y_train)

# Step 5: Prediction and evaluation
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
print(f"Mean Squared Error: {mse:.2f}")

# Step 6: Save the trained model
with open("traffic_model_noida.pkl", "wb") as f:
    pickle.dump(model, f)
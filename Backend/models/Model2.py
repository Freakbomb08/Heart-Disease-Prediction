import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report, roc_auc_score
try:
    from xgboost import XGBClassifier
    xgb_available = True
except:
    xgb_available = False
import joblib

# Load dataset
df = pd.read_csv("./Backend/data/heart_failure_clinical_records_dataset.csv")
print(df.head())
print(df.info())
print(df.describe())

# Check imbalance
sns.countplot(x=df['DEATH_EVENT'])
plt.title("Death Event Count (0 = survived, 1 = died)")
plt.show()
# Correlation heatmap
plt.figure(figsize=(10,7))
sns.heatmap(df.corr(), annot=False, cmap='coolwarm')
plt.title("Correlation Heatmap")
plt.show()

# Features and Target
X = df.drop("DEATH_EVENT", axis=1)
y = df["DEATH_EVENT"]

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Scale the data
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train Random Forest Model
model = XGBClassifier(
        n_estimators=300,
        learning_rate=0.05,
        max_depth=4,
        subsample=0.8,
        eval_metric="logloss"
    )
model.fit(X_train_scaled, y_train)
y_pred = model.predict(X_test_scaled)
print("Accuracy:", accuracy_score(y_test, y_pred))
print(classification_report(y_test, y_pred))

sns.heatmap(confusion_matrix(y_test, y_pred), annot=True, fmt='d')
plt.title("Confusion Matrix")
plt.show()
# ROC-AUC
probs = model.predict_proba(X_test_scaled)[:, 1]
print("ROC-AUC Score:", roc_auc_score(y_test, probs))

# Save Model + Scaler
joblib.dump(model, "./Backend/models/heart_failure_model.pkl")
joblib.dump(scaler, "./Backend/models/heart_failure_scaler.pkl")
print("Model and scaler saved successfully!")
# Prediction Function
# def predict_heart_failure(input_data):
#     df_input = pd.DataFrame([input_data])
#     df_scaled = scaler.transform(df_input)
    
#     pred = model.predict(df_scaled)[0]
#     prob = model.predict_proba(df_scaled)[0][1]

#     return {
#         "risk_prediction": int(pred),
#         "risk_probability": float(round(prob, 3))
#     }

# # Example patient
# sample = {
#     "age": 65,
#     "anaemia": 0,
#     "creatinine_phosphokinase": 120,
#     "diabetes": 1,
#     "ejection_fraction": 25,
#     "high_blood_pressure": 1,
#     "platelets": 250000,
#     "serum_creatinine": 1.9,
#     "serum_sodium": 130,
#     "sex": 1,
#     "smoking": 0,
#     "time": 120
# }
# print(sample)
# print(predict_heart_failure(sample))

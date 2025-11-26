import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report, roc_auc_score
from sklearn.ensemble import RandomForestClassifier
import joblib
df = pd.read_csv("./Backend/data/heart.csv")
print(df.head(10))
print(df.shape)
df.info()
print(df.isnull().sum())
print(df['target'].value_counts())
df.drop_duplicates().inplace=True
print("After removing duplicates:", df.shape)
# Data preprocessing
df['sex'] = df['sex'].replace([0, 1], ['Female', 'Male'])
df['cp'] = df['cp'].replace([0,1,2,3],['Typical Angina','Atypical Angina','Non-anginal Pain','Asymptomatic'])
df['fbs'] = df['fbs'].replace([0,1],['False','True'])
df['restecg'] = df['restecg'].replace([0,1,2],['Normal','ST-T Abnormality','Left Ventricular Hypertrophy'])
df['exang'] = df['exang'].replace([0,1],['No', 'Yes'])
df['thal'] = df['thal'].replace([1,2,3],['Normal', 'Fixed Defect', 'Reversible Defect'])
print(df.describe())
print(df.info())
print(df.head())
# Encode categorical columns to numerical for ML
df['sex'] = df['sex'].astype('category').cat.codes
df['cp'] = df['cp'].astype('category').cat.codes
df['fbs'] = df['fbs'].astype('category').cat.codes
df['restecg'] = df['restecg'].astype('category').cat.codes
df['exang'] = df['exang'].astype('category').cat.codes
df['thal'] = df['thal'].astype('category').cat.codes
# Plotting visualizations
sns.countplot(x=df['target'])
plt.title("Disease Presence Count")
plt.show()
plt.figure(figsize=(8,6))
sns.heatmap(df.corr(), annot=False)
plt.title("Correlation Heatmap")
plt.show()
sns.boxplot(x='target', y='oldpeak', data=df)
plt.title("Oldpeak vs Disease")
plt.show()
sns.scatterplot(x='age', y='thalach', hue='target', data=df)
plt.title("Age vs Max Heart Rate by Disease Presence")
plt.show()
# Model Training
X = df.drop("target", axis=1)
y = df["target"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)
# #Random forest classifier ML Algorithm
model = RandomForestClassifier(
    n_estimators=300,
    max_depth=8,
    random_state=42
)
model.fit(X_train_scaled, y_train)
y_pred = model.predict(X_test_scaled)
print("Accuracy:", accuracy_score(y_test, y_pred))
print(classification_report(y_test, y_pred))
sns.heatmap(confusion_matrix(y_test, y_pred), annot=True, fmt='d')
plt.title("Confusion Matrix")
plt.show()
probs = model.predict_proba(X_test_scaled)[:, 1]
print("ROC-AUC:", roc_auc_score(y_test, probs))
joblib.dump(model, "./Backend/models/heart_disease_presence_model.pkl")
joblib.dump(scaler, "./Backend/models/presence_scaler.pkl")
print("Model and scaler saved.")
plt.close()
# Testing the saved model
# def predict_heart_disease(input_data):
#     df_input = pd.DataFrame([input_data])
#     df_scaled = scaler.transform(df_input)
#     prediction = model.predict(df_scaled)[0]
#     probability = model.predict_proba(df_scaled)[0][1]
#     return {
#         "prediction": int(prediction),
#         "probability": float(round(probability, 3)w)
#     }
# sample_patient = {
#     "age": 15,
#     "sex": 1,
#     "cp": 0,
#     "trestbps": 100,
#     "chol": 130,
#     "fbs": 0,
#     "restecg": 1,
#     "thalach": 160,
#     "exang": 0,
#     "oldpeak": 1.0,
#     "slope": 2,
#     "ca": 2,
#     "thal": 3
# }
# print(sample_patient)
# print(predict_heart_disease(sample_patient))
print("Model Saved Successfully.")
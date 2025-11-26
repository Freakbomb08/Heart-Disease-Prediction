import joblib
import pandas as pd
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

PRESENCE_MODEL_PATH = os.path.join(BASE_DIR, "models", "heart_disease_presence_model.pkl")
PRESENCE_SCALER_PATH = os.path.join(BASE_DIR, "models", "presence_scaler.pkl")
FAILURE_MODEL_PATH = os.path.join(BASE_DIR, "models", "heart_failure_model.pkl")
FAILURE_SCALER_PATH = os.path.join(BASE_DIR, "models", "heart_failure_scaler.pkl")

presence_model = joblib.load(PRESENCE_MODEL_PATH)
presence_scaler = joblib.load(PRESENCE_SCALER_PATH)
failure_model = joblib.load(FAILURE_MODEL_PATH)
failure_scaler = joblib.load(FAILURE_SCALER_PATH)

def predict_presence(data: dict):
    df = pd.DataFrame([data])
    df_scaled = presence_scaler.transform(df)
    pred = presence_model.predict(df_scaled)[0]
    prob = presence_model.predict_proba(df_scaled)[0][1]

    presence_res = {
        "label":"Disease_present" if int(pred) == 1 else "No_disease",
        "probability": round(float(prob), 3)
    }
    return presence_res

def predict_failure(data: dict):
    df = pd.DataFrame([data])
    df_scaled = failure_scaler.transform(df)
    # pred = failure_model.predict(df_scaled)[0]
    prob = failure_model.predict_proba(df_scaled)[0]

    failure_res = {
        "attack_risk": round(float(prob[0]), 3),
        "failure_risk": round(float(prob[1]), 3),
        "healthy_prob": round(float(prob[2]), 3)
    }
    max_prob = max(prob)
    if max_prob > 0.7:
        risk_level = "High"
    elif max_prob > 0.4:
        risk_level = "Moderate"
    else:
        risk_level = "Low"
    failure_res["risk_level"] = risk_level
    return failure_res

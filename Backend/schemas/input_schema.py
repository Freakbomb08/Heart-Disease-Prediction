from pydantic import BaseModel
from typing import Optional
class PresenceInput(BaseModel):
    age: int
    sex: int
    cp: int
    trestbps: int
    chol: int
    fbs: int
    restecg: int
    thalach: int
    exang: int
    oldpeak: float
    slope: int
    ca: int
    thal: int

class FailureInput(BaseModel):
    age: int
    anaemia: int
    creatinine_phosphokinase: int
    diabetes: int
    ejection_fraction: int
    high_blood_pressure: int
    platelets: float
    serum_creatinine: float
    serum_sodium: int
    sex: int
    smoking: int
    time: int
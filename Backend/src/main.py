from fastapi import FastAPI, Header, HTTPException
from ..schemas.input_schema import PresenceInput, FailureInput
from ..schemas.reports_input import ReportInput
from .predict import predict_presence, predict_failure
from .pdf_generator import generate_report
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
load_dotenv()

app = FastAPI(
    title="<h2>Heart Disease Prediction API</h2>",
    description="<strong>ML models for heart disease detection, classification & failure prediction</strong>",
    version="1.0"
)
origins = [
    "http://localhost:8080",#Server URL
    "http://localhost:3000",#Frontend URL
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
API_KEY = os.getenv("API_KEY")
if not API_KEY:
    raise ValueError("❌ API_KEY is missing in .env")
def verify_api_key(x_api_key: str = Header(None)):
    if x_api_key != API_KEY:
        raise HTTPException(
            status_code=401,
            detail="Unauthorized: Invalid API Key"
        )

@app.get("/")
def home():
    return {"message": "Heart Disease Prediction API is running!"}

@app.post("/predict/presence")
async def predict_disease_api(input: PresenceInput, x_api_key: str = Header(None)):
    result = predict_presence(input.dict())
    return {"status": "success", "result": result}

@app.post("/predict/failure")
async def predict_failure_api(input: FailureInput, x_api_key: str = Header(None)):
    result = predict_failure(input.dict())
    return {"status": "success", "result": result}

@app.post("/generate-report")
async def create_report(patient: ReportInput, x_api_key: str = Header(None)):
    patient_data = patient.dict()
    presence_fields = {k: patient_data[k] for k in [
        "age","sex","cp","trestbps","chol","fbs","restecg",
        "thalach","exang","oldpeak","slope","ca","thal"
    ]}
    failure_fields = {k: patient_data[k] for k in [
        "age","anaemia","creatinine_phosphokinase","diabetes",
        "ejection_fraction","high_blood_pressure","platelets",
        "serum_creatinine","serum_sodium","sex","smoking","time"
    ]}
    presence_res = predict_presence(presence_fields)
    failure_res = predict_failure(failure_fields)

    pdf_path = generate_report(patient_data, presence_res, failure_res)

    return {"status": "success", "pdf": pdf_path, "presence_res": presence_res, "failure_res": failure_res}
@app.get("*")
async def catch_all():
    return {"<b>message": "Error: 404 : The requested resource was not found.</b>\n<strong>return to <a href='/'>home</a></strong>."}
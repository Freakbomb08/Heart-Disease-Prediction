// src/utils/heartPrediction.ts

// The expected structure of the patient data (must match your Python model's input order)
export interface PatientData {
  patient_name: string;
  age: number; sex: number; cp: number; trestbps: number; chol: number; fbs: number; restecg: number;
  thalach: number; exang: number; oldpeak: number; slope: number; ca: number; thal: number;
  anaemia: number; creatinine_phosphokinase: number; diabetes: number; ejection_fraction: number;
  high_blood_pressure: number; platelets: number; serum_creatinine: number; serum_sodium: number;
  smoking: number; time: number;
}

// The expected structure of the prediction response from your FastAPI server
export interface PredictionResponse {
    status: string;
    pdf: string;
    presence_res: {
        label: string;
        probability: number;
    };
    failure_res: {
        attack_risk: number;
        failure_risk: number;
        healthy_prob: number;
        risk_level: string;
    };
}

/**
 * Calls the FastAPI backend to get a heart disease prediction.
 * @param data The patient data collected from the form.
 * @returns A promise that resolves to the PredictionResponse.
 */
export const predictHeartDisease = async (data: PatientData): Promise<PredictionResponse> => {
    // IMPORTANT: Ensure this URL and port match your FastAPI server configuration
    const API_URL = 'http://localhost:8080/generate-report';

    // Extract only the fields needed for presence prediction
    const presenceData = {
        age: data.age,
        sex: data.sex,
        cp: data.cp,
        trestbps: data.trestbps,
        chol: data.chol,
        fbs: data.fbs,
        restecg: data.restecg,
        thalach: data.thalach,
        exang: data.exang,
        oldpeak: data.oldpeak,
        slope: data.slope,
        ca: data.ca,
        thal: data.thal,
        anaemia: data.anaemia,
        creatinine_phosphokinase: data.creatinine_phosphokinase,
        diabetes: data.diabetes,
        ejection_fraction: data.ejection_fraction,
        high_blood_pressure: data.high_blood_pressure,
        platelets: data.platelets,
        serum_creatinine: data.serum_creatinine,
        serum_sodium: data.serum_sodium,
        smoking: data.smoking,
        time: data.time,
        patient_name: data.patient_name
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'your-api-key-here' // Add API key if required
            },
            // Convert the JavaScript object into a JSON string to send to the server
            body: JSON.stringify(presenceData),
        });

        if (!response.ok) {
            // Handle HTTP errors (e.g., 404, 500)
            const errorBody = await response.json();
            throw new Error(`API call failed: ${response.status} - ${errorBody.detail || 'Unknown error'}`);
        }

        const result: PredictionResponse = await response.json();
        return result;

    } catch (error) {
        console.error('Error during heart prediction API call:', error);
        // Re-throw the error for the calling component (PredictionForm) to handle
        throw new Error("Failed to connect to the prediction server. Please check the backend.");
    }
};
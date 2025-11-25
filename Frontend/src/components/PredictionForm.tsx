import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Activity, ArrowLeft, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Re-using the same interface
export interface PatientData {
  age: number; sex: number; cp: number; trestbps: number; chol: number; fbs: number; restecg: number;
  thalach: number; exang: number; oldpeak: number; slope: number; ca: number; thal: number;
  anaemia: number; creatinine_phosphokinase: number; diabetes: number; ejection_fraction: number;
  high_blood_pressure: number; platelets: number; serum_creatinine: number; serum_sodium: number;
  smoking: number; time: number;
}

interface PredictionFormProps {
  onPredict: (data: PatientData) => void;
  isLoading: boolean;
}

const steps = [
  { id: 1, title: "Vitals & Demographics" },
  { id: 2, title: "Cardiac Stress Data" },
  { id: 3, title: "Lab Results & History" },
];

export const PredictionForm = ({ onPredict, isLoading }: PredictionFormProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<PatientData>(
    // Initial state matching the original file
    {
        age: 50, sex: 1, cp: 0, trestbps: 120, chol: 200, fbs: 0, restecg: 0,
        thalach: 150, exang: 0, oldpeak: 0, slope: 1, ca: 0, thal: 2,
        anaemia: 0, creatinine_phosphokinase: 250, diabetes: 0, ejection_fraction: 50,
        high_blood_pressure: 0, platelets: 250000, serum_creatinine: 1.0, serum_sodium: 140,
        smoking: 0, time: 100,
    }
  );

  const handleChange = (key: keyof PatientData, value: string | number) => {
    setFormData({ ...formData, [key]: Number(value) });
  };

  const validateStep = () => {
    // Basic validation logic can be added here, e.g., checking if required fields in the current step are filled.
    // For simplicity, we only check age (as per the original file's logic).
    if (currentStep === 1 && (formData.age < 1 || formData.age > 120)) {
        toast({ title: "Validation Error", description: "Please enter a valid age (1-120).", variant: "destructive" });
        return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep() && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep()) {
      onPredict(formData);
    }
  };

  const renderFormContent = () => {
    // Using a 2-column grid for better horizontal space utilization
    const fieldClassName = "space-y-2";
    const gridClassName = "grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4";
    
    switch (currentStep) {
      case 1:
        return (
          <div className={gridClassName}>
            {/* Step 1: Vitals & Demographics (age, sex, trestbps, chol, fbs, high_blood_pressure, smoking) */}
            <div className={fieldClassName}>
              <Label htmlFor="age">Age</Label>
              <Input id="age" type="number" value={formData.age} onChange={(e) => handleChange('age', e.target.value)} required />
            </div>

            <div className={fieldClassName}>
              <Label htmlFor="sex">Sex</Label>
              <Select value={formData.sex.toString()} onValueChange={(value) => handleChange('sex', value)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Male</SelectItem>
                  <SelectItem value="0">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className={fieldClassName}>
              <Label htmlFor="trestbps">Resting Blood Pressure (mm Hg)</Label>
              <Input id="trestbps" type="number" value={formData.trestbps} onChange={(e) => handleChange('trestbps', e.target.value)} required />
            </div>

            <div className={fieldClassName}>
              <Label htmlFor="chol">Cholesterol (mg/dl)</Label>
              <Input id="chol" type="number" value={formData.chol} onChange={(e) => handleChange('chol', e.target.value)} required />
            </div>

            <div className={fieldClassName}>
              <Label htmlFor="fbs">Fasting Blood Sugar &gt; 120 mg/dl</Label>
              <Select value={formData.fbs.toString()} onValueChange={(value) => handleChange('fbs', value)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">No</SelectItem>
                  <SelectItem value="1">Yes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className={fieldClassName}>
              <Label htmlFor="high_blood_pressure">High Blood Pressure History</Label>
              <Select value={formData.high_blood_pressure.toString()} onValueChange={(value) => handleChange('high_blood_pressure', value)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">No</SelectItem>
                  <SelectItem value="1">Yes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
             <div className={fieldClassName}>
              <Label htmlFor="smoking">Smoking History</Label>
              <Select value={formData.smoking.toString()} onValueChange={(value) => handleChange('smoking', value)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">No</SelectItem>
                  <SelectItem value="1">Yes</SelectItem>
                </SelectContent>
              </Select>
            </div>

          </div>
        );
      case 2:
        return (
          <div className={gridClassName}>
            {/* Step 2: Cardiac & ECG Data (cp, restecg, thalach, exang, oldpeak, slope, ca, thal) */}
            <div className={fieldClassName}>
              <Label htmlFor="cp">Chest Pain Type (CP)</Label>
              <Select value={formData.cp.toString()} onValueChange={(value) => handleChange('cp', value)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Typical Angina</SelectItem>
                  <SelectItem value="1">Atypical Angina</SelectItem>
                  <SelectItem value="2">Non-Anginal Pain</SelectItem>
                  <SelectItem value="3">Asymptomatic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className={fieldClassName}>
              <Label htmlFor="thalach">Maximum Heart Rate</Label>
              <Input id="thalach" type="number" value={formData.thalach} onChange={(e) => handleChange('thalach', e.target.value)} required />
            </div>
            
            <div className={fieldClassName}>
              <Label htmlFor="exang">Exercise-Induced Angina</Label>
              <Select value={formData.exang.toString()} onValueChange={(value) => handleChange('exang', value)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">No</SelectItem>
                  <SelectItem value="1">Yes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className={fieldClassName}>
              <Label htmlFor="restecg">Resting ECG</Label>
              <Select value={formData.restecg.toString()} onValueChange={(value) => handleChange('restecg', value)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Normal</SelectItem>
                  <SelectItem value="1">ST-T Wave Abnormality</SelectItem>
                  <SelectItem value="2">Left Ventricular Hypertrophy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className={fieldClassName}>
              <Label htmlFor="oldpeak">Oldpeak (ST Depression)</Label>
              <Input id="oldpeak" type="number" step="0.1" value={formData.oldpeak} onChange={(e) => handleChange('oldpeak', e.target.value)} required />
            </div>

            <div className={fieldClassName}>
              <Label htmlFor="slope">ST Slope</Label>
              <Select value={formData.slope.toString()} onValueChange={(value) => handleChange('slope', value)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Upsloping</SelectItem>
                  <SelectItem value="1">Flat</SelectItem>
                  <SelectItem value="2">Downsloping</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className={fieldClassName}>
              <Label htmlFor="ca">Number of Major Vessels (0-3)</Label>
              <Input id="ca" type="number" min="0" max="3" value={formData.ca} onChange={(e) => handleChange('ca', e.target.value)} required />
            </div>

            <div className={fieldClassName}>
              <Label htmlFor="thal">Thalassemia</Label>
              <Select value={formData.thal.toString()} onValueChange={(value) => handleChange('thal', value)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Normal</SelectItem>
                  <SelectItem value="1">Fixed Defect</SelectItem>
                  <SelectItem value="2">Reversible Defect</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case 3:
        return (
          <div className={gridClassName}>
            {/* Step 3: Lab Results & Comorbidities (anaemia, creatinine_phosphokinase, diabetes, ejection_fraction, platelets, serum_creatinine, serum_sodium, time) */}
            <div className={fieldClassName}>
              <Label htmlFor="ejection_fraction">Ejection Fraction (%)</Label>
              <Input id="ejection_fraction" type="number" min="0" max="100" value={formData.ejection_fraction} onChange={(e) => handleChange('ejection_fraction', e.target.value)} required />
            </div>

            <div className={fieldClassName}>
              <Label htmlFor="creatinine_phosphokinase">Creatinine Phosphokinase (mcg/L)</Label>
              <Input id="creatinine_phosphokinase" type="number" value={formData.creatinine_phosphokinase} onChange={(e) => handleChange('creatinine_phosphokinase', e.target.value)} required />
            </div>
            
            <div className={fieldClassName}>
              <Label htmlFor="platelets">Platelets (kiloplatelets/mL)</Label>
              <Input id="platelets" type="number" value={formData.platelets} onChange={(e) => handleChange('platelets', e.target.value)} required />
            </div>

            <div className={fieldClassName}>
              <Label htmlFor="serum_creatinine">Serum Creatinine (mg/dL)</Label>
              <Input id="serum_creatinine" type="number" step="0.1" value={formData.serum_creatinine} onChange={(e) => handleChange('serum_creatinine', e.target.value)} required />
            </div>

            <div className={fieldClassName}>
              <Label htmlFor="serum_sodium">Serum Sodium (mEq/L)</Label>
              <Input id="serum_sodium" type="number" value={formData.serum_sodium} onChange={(e) => handleChange('serum_sodium', e.target.value)} required />
            </div>

            <div className={fieldClassName}>
              <Label htmlFor="diabetes">Diabetes History</Label>
              <Select value={formData.diabetes.toString()} onValueChange={(value) => handleChange('diabetes', value)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">No</SelectItem>
                  <SelectItem value="1">Yes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className={fieldClassName}>
              <Label htmlFor="anaemia">Anaemia History</Label>
              <Select value={formData.anaemia.toString()} onValueChange={(value) => handleChange('anaemia', value)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">No</SelectItem>
                  <SelectItem value="1">Yes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className={fieldClassName}>
              <Label htmlFor="time">Follow-up Time (days)</Label>
              <Input id="time" type="number" value={formData.time} onChange={(e) => handleChange('time', e.target.value)} required />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const progressValue = (currentStep / steps.length) * 100;

  return (
    <Card className="shadow-2xl">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-primary/10">
            <Activity className="w-6 h-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl">Step {currentStep}: {steps[currentStep - 1].title}</CardTitle>
            <CardDescription>Enter clinical parameters to proceed</CardDescription>
          </div>
        </div>
        <Progress value={progressValue} className="mt-4 h-2" />
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {renderFormContent()}
        </CardContent>

        <CardFooter className="flex justify-between pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1 || isLoading}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          {currentStep < steps.length ? (
            <Button type="button" onClick={handleNext} disabled={isLoading}>
              Next Step
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button type="submit" className="w-1/3 bg-teal-500 hover:bg-teal-600" disabled={isLoading}>
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Analyzing...
                </>
              ) : (
                "Analyze Risk"
              )}
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
};
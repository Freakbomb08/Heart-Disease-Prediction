import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Activity, ArrowLeft, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Re-using the same interface
export interface PatientData {
  patient_name: string;
  age: number; sex: number; cp: number; trestbps: number; chol: number; fbs: number; restecg: number;
  thalach: number; exang: number; oldpeak: number; slope: number; ca: number; thal: number;
  anaemia: number; creatinine_phosphokinase: number; diabetes: number; ejection_fraction: number;
  high_blood_pressure: number; platelets: number; serum_creatinine: number; serum_sodium: number;
  smoking: number; time: number;
}

const formSchema = z.object({
  patient_name: z.string().min(1, "Patient name is required"),
  age: z.number().min(1, "Age must be at least 1").max(120, "Age must be at most 120"),
  sex: z.number().min(0).max(1),
  cp: z.number().min(0).max(3),
  trestbps: z.number().min(0),
  chol: z.number().min(0),
  fbs: z.number().min(0).max(1),
  restecg: z.number().min(0).max(2),
  thalach: z.number().min(0),
  exang: z.number().min(0).max(1),
  oldpeak: z.number().min(0),
  slope: z.number().min(0).max(2),
  ca: z.number().min(0).max(3),
  thal: z.number().min(0).max(2),
  anaemia: z.number().min(0).max(1),
  creatinine_phosphokinase: z.number().min(0),
  diabetes: z.number().min(0).max(1),
  ejection_fraction: z.number().min(0).max(100),
  high_blood_pressure: z.number().min(0).max(1),
  platelets: z.number().min(0),
  serum_creatinine: z.number().min(0),
  serum_sodium: z.number().min(0),
  smoking: z.number().min(0).max(1),
  time: z.number().min(0),
});

interface PredictionFormProps {
  onPredict: (data: PatientData) => void;
  isLoading: boolean;
}

const steps = [
  { id: 1, title: "Patient Details" },
  { id: 2, title: "Vitals & Measurements" },
  { id: 3, title: "Clinical Parameters" },
  { id: 4, title: "Final Parameters" },
];

export const PredictionForm = ({ onPredict, isLoading }: PredictionFormProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm<PatientData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patient_name: "", age: 30, sex: 1, cp: 0, trestbps: 120, chol: 200, fbs: 0, restecg: 0,
      thalach: 150, exang: 0, oldpeak: 0, slope: 1, ca: 0, thal: 2,
      anaemia: 0, creatinine_phosphokinase: 250, diabetes: 0, ejection_fraction: 50,
      high_blood_pressure: 0, platelets: 250000, serum_creatinine: 1.0, serum_sodium: 140,
      smoking: 0, time: 100,
    },
  });

  const onSubmit = (data: PatientData) => {
    onPredict(data);
  };

  const validateStep = () => {
    // Basic validation logic can be added here, e.g., checking if required fields in the current step are filled.
    // For simplicity, we only check age (as per the original file's logic).
    const age = form.getValues("age");
    if (currentStep === 1 && (age < 1 || age > 100)) {
      toast({ title: "Validation Error", description: "Please enter a valid age (1-100).", variant: "destructive" });
      return false;
    }
    return true;
    const name = form.getValues("patient_name");
    if (currentStep === 1 && name.trim() === "") {
      toast({ title: "Validation Error", description: "Patient name is required.", variant: "destructive" });
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep() && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const StepWrapper = ({ children }) => (
    <div className="space-y-4 p-6 bg-white shadow rounded-xl">{children}</div>
  );

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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            {currentStep === 1 && (
              <StepWrapper>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="patient_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Patient Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="sex"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sex</FormLabel>
                        <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value.toString()}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">Male</SelectItem>
                            <SelectItem value="0">Female</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Chest Pain Type (cp)</FormLabel>
                        <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value.toString()}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="0">Typical Angina</SelectItem>
                            <SelectItem value="1">Atypical Angina</SelectItem>
                            <SelectItem value="2">Non-Anginal Pain</SelectItem>
                            <SelectItem value="3">Asymptomatic</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </StepWrapper>
            )}
            {currentStep === 2 && (
              <StepWrapper>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="trestbps"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Resting Blood Pressure (mm Hg)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="chol"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cholesterol (mg/dl)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="fbs"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fasting Blood Sugar (greater than 120 mg/dl)</FormLabel>
                        <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value.toString()}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="0">No</SelectItem>
                            <SelectItem value="1">Yes</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="restecg"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Resting Electrocardiographic Results</FormLabel>
                        <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value.toString()}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="0">Normal</SelectItem>
                            <SelectItem value="1">ST-T Wave Abnormality</SelectItem>
                            <SelectItem value="2">Left Ventricular Hypertrophy</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="thalach"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maximum Heart Rate</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="exang"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Exercise-Induced Angina</FormLabel>
                        <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value.toString()}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="0">No</SelectItem>
                            <SelectItem value="1">Yes</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </StepWrapper>
            )}
            {currentStep === 3 && (
              <StepWrapper>
                <h2 className="text-xl font-semibold mb-4">Step 3: Clinical Parameters</h2>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="oldpeak"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ST Depression (oldpeak)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="slope"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ST Slope</FormLabel>
                        <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value.toString()}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="0">Upsloping</SelectItem>
                            <SelectItem value="1">Flat</SelectItem>
                            <SelectItem value="2">Downsloping</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ca"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Major Vessels (0-3)</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" max="3" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="thal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Thalassemia</FormLabel>
                        <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value.toString()}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="0">Normal</SelectItem>
                            <SelectItem value="1">Fixed Defect</SelectItem>
                            <SelectItem value="2">Reversible Defect</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="anaemia"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Anaemia</FormLabel>
                        <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value.toString()}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="0">No</SelectItem>
                            <SelectItem value="1">Yes</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="creatinine_phosphokinase"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Creatinine Phosphokinase (mcg/L)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="diabetes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Diabetes</FormLabel>
                        <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value.toString()}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="0">No</SelectItem>
                            <SelectItem value="1">Yes</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </StepWrapper>
            )}
            {currentStep === 4 && (
              <StepWrapper>
                <h2 className="text-xl font-semibold mb-4">Step 4: Final Parameters</h2>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="ejection_fraction"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ejection Fraction (%)</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" max="100" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="high_blood_pressure"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>High Blood Pressure</FormLabel>
                        <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value.toString()}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="0">No</SelectItem>
                            <SelectItem value="1">Yes</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="platelets"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Platelets (kiloplatelets/mL)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="serum_creatinine"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Serum Creatinine (mg/dL)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="serum_sodium"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Serum Sodium (mEq/L)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="smoking"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Smoking</FormLabel>
                        <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value.toString()}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="0">No</SelectItem>
                            <SelectItem value="1">Yes</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Follow-up Time (days)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Submit Buttons */}
              </StepWrapper>
            )}
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
                    Generatings...
                  </>
                ) : (
                  "Generate Report"
                )}
              </Button>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
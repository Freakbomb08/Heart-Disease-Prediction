import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { PredictionForm, PatientData } from "@/components/PredictionForm";
import { PredictionResult } from "@/components/PredictionResult";
import { predictHeartDisease, PredictionResult as PredictionResultType } from "@/utils/heartPrediction";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [result, setResult] = useState<PredictionResultType | null>(null);
  const { toast } = useToast();

  const handlePredict = (data: PatientData) => {
    const prediction = predictHeartDisease(data);
    setResult(prediction);
    
    toast({
      title: "Analysis Complete",
      description: "Your cardiovascular risk assessment has been generated.",
    });
    
    // Scroll to results
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen">
      <HeroSection />
      
      <main className="max-w-6xl mx-auto px-4 py-12">
        <PredictionForm onPredict={handlePredict} />
        
        {result && (
          <div id="results" className="mt-12">
            <PredictionResult
              riskScore={result.riskScore}
              riskLevel={result.riskLevel}
              confidence={result.confidence}
            />
          </div>
        )}
      </main>
      
      <footer className="border-t mt-20 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>© 2025 Heart Disease Prediction. For educational purposes only.</p>
          <p className="mt-2">Not a substitute for professional medical advice.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, Heart, Shield, TrendingUp, Download } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface PredictionResultProps {
  presenceResult: {
    label: string;
    probability: number;
  };
  failureResult: {
    attack_risk: number;
    failure_risk: number;
    healthy_prob: number;
    risk_level: string;
  };
  pdfPath: string;
}

export const PredictionResult = ({ riskScore, riskLevel, confidence }: PredictionResultProps) => {
  const getRiskColor = () => {
    switch (riskLevel) {
      case "low":
        return "text-success";
      case "moderate":
        return "text-warning";
      case "high":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  const getRiskBgColor = () => {
    switch (riskLevel) {
      case "low":
        return "bg-success/10";
      case "moderate":
        return "bg-warning/10";
      case "high":
        return "bg-destructive/10";
      default:
        return "bg-muted";
    }
  };

  const getRiskIcon = () => {
    switch (riskLevel) {
      case "low":
        return <Shield className="w-6 h-6" />;
      case "moderate":
        return <TrendingUp className="w-6 h-6" />;
      case "high":
        return <AlertCircle className="w-6 h-6" />;
      default:
        return <Heart className="w-6 h-6" />;
    }
  };

  const getRecommendations = () => {
    switch (riskLevel) {
      case "low":
        return [
          "Maintain regular physical activity",
          "Continue healthy eating habits",
          "Schedule routine check-ups",
          "Monitor blood pressure regularly",
        ];
      case "moderate":
        return [
          "Consult with a cardiologist",
          "Increase physical activity gradually",
          "Adopt a heart-healthy diet",
          "Monitor cardiovascular risk factors",
          "Consider stress management techniques",
        ];
      case "high":
        return [
          "Seek immediate medical consultation",
          "Schedule comprehensive cardiac evaluation",
          "Follow prescribed medication strictly",
          "Implement lifestyle modifications urgently",
          "Regular monitoring and follow-ups essential",
        ];
      default:
        return [];
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="shadow-medium">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-lg ${getRiskBgColor()} ${getRiskColor()}`}>
              {getRiskIcon()}
            </div>
            <div>
              <CardTitle>Risk Assessment Results</CardTitle>
              <CardDescription>Based on provided clinical parameters</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Risk Score</span>
              <span className={`text-2xl font-bold ${getRiskColor()}`}>
                {riskScore.toFixed(1)}%
              </span>
            </div>
            <Progress value={riskScore} className="h-3" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Confidence Level</span>
              <span className="text-xl font-semibold text-primary">
                {confidence.toFixed(1)}%
              </span>
            </div>
            <Progress value={confidence} className="h-2" />
          </div>

          <Alert className={`${getRiskBgColor()} border-none`}>
            <AlertCircle className={`h-4 w-4 ${getRiskColor()}`} />
            <AlertTitle className={getRiskColor()}>
              {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)} Risk Level
            </AlertTitle>
            <AlertDescription>
              {riskLevel === "low" &&
                "Your cardiovascular risk factors are within acceptable ranges. Continue maintaining healthy lifestyle habits."}
              {riskLevel === "moderate" &&
                "Several risk factors indicate moderate cardiovascular risk. Medical consultation and lifestyle modifications recommended."}
              {riskLevel === "high" &&
                "Multiple indicators suggest elevated cardiovascular risk. Immediate medical attention and comprehensive evaluation strongly recommended."}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle>Recommendations</CardTitle>
          <CardDescription>Suggested next steps based on your assessment</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {getRecommendations().map((recommendation, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-semibold text-primary">{index + 1}</span>
                </div>
                <span className="text-sm text-muted-foreground">{recommendation}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Alert>
        <Heart className="h-4 w-4" />
        <AlertTitle>Medical Disclaimer</AlertTitle>
        <AlertDescription className="text-xs">
          This prediction tool is for educational purposes only and should not replace professional
          medical advice. Always consult with qualified healthcare providers for accurate diagnosis
          and treatment recommendations.
        </AlertDescription>
      </Alert>
    </div>
  );
};

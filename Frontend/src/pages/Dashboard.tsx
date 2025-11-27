import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PredictionForm, PatientData } from "@/components/PredictionForm";
import { PredictionResult } from "@/components/PredictionResult";
import { useToast } from "@/hooks/use-toast";
import { Heart, Home, History, Settings, LogOut, Activity, ArrowRight } from "lucide-react";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { NavLink } from "@/components/NavLink";
import NavBar from "@/components/NavBar";

import ProfileSettings from "@/components/ProfileSettings";

type PredictionResultType = { riskScore: number; riskLevel: "low" | "moderate" | "high"; confidence: number; };
const predictHeartDisease = (data: PatientData): PredictionResultType => {
    const score = data.age > 60 ? 75 : data.age > 45 ? 50 : 20;
    const level = score > 60 ? "high" : score > 35 ? "moderate" : "low";
    return { riskScore: score, riskLevel: level, confidence: 92.5 };
};

type DashboardView = 'home' | 'assessment' | 'history' | 'settings';

// --- Dashboard Home Component ---
const DashboardHome = ({ onViewChange }: { onViewChange: (view: DashboardView) => void }) => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold">Welcome Back!</h1>
    <p className="text-lg text-muted-foreground">Ready to check your heart health today?</p>

    <Card className="p-8 border-2 border-primary/20 transition hover:shadow-xl hover:border-primary/50">
      <CardTitle className="flex items-center gap-3 text-2xl mb-3">
        <Activity className="w-6 h-6 text-primary" />
        Start New Assessment
      </CardTitle>
      <CardDescription className="mb-6">
        Input your clinical data to generate a new risk assessment report.
      </CardDescription>
      <Button size="lg" onClick={() => onViewChange('assessment')}>
        Start Assessment Now
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </Card>

    <Card className="p-6 bg-muted/30">
        <CardTitle className="text-xl mb-2">Review Past Results</CardTitle>
        <CardDescription className="mb-4">
            Access and compare your previous cardiovascular risk reports.
        </CardDescription>
        <Button variant="link" onClick={() => onViewChange('history')} className="p-0">
            View Assessment History
        </Button>
    </Card>
  </div>
);
interface DashboardProps {
  user: any;
  onLogout: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}
// --- Dashboard Component (Main Layout) ---
const Dashboard: React.FC<DashboardProps> = ({ user, onLogout, darkMode, toggleDarkMode }) => {

  const { toast } = useToast();
  const [currentView, setCurrentView] = useState<DashboardView>('home');
  const [result, setResult] = useState<PredictionResultType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handlePredict = (data: PatientData) => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
        const prediction = predictHeartDisease(data);
        setResult(prediction);
        setIsLoading(false);
        
        toast({
            title: "Analysis Complete",
            description: "Your cardiovascular risk assessment has been generated.",
        });

        // Immediately scroll to results (or change view to results page)
        // For simplicity, we keep the form and results on the same assessment view
        setTimeout(() => {
            document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, 2000); // 2 second delay
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <DashboardHome onViewChange={setCurrentView} />;
      case 'assessment':
        return (
          <>
            <h1 className="text-3xl font-bold mb-6">Cardiovascular Risk Assessment</h1>
            <PredictionForm onPredict={handlePredict} isLoading={isLoading} />
            {result && (
              <div id="results" className="mt-12">
                <PredictionResult
                  riskScore={result.riskScore}
                  riskLevel={result.riskLevel}
                  confidence={result.confidence}
                />
              </div>
            )}
          </>
        );
      case 'settings':
        return <ProfileSettings darkMode={darkMode} toggleDarkMode={toggleDarkMode} />;
      default:
        return <DashboardHome onViewChange={setCurrentView} />;
    }
  };


  const navItems: { view: DashboardView; icon: React.ElementType; label: string }[] = [
    { view: 'home', icon: Home, label: 'Dashboard (Home)' },
    { view: 'assessment', icon: Activity, label: 'New Assessment' },
    { view: 'settings', icon: Settings, label: 'Profile & Settings' },
  ];
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="flex flex-1 max-w-screen-xl mx-auto w-full">
        {/* Sidebar */}
        <aside className="w-64 border-r p-6 sticky top-0 h-full hidden lg:block bg-muted/10">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavLink 
                key={item.view}
                to="#" // Using # because we're managing view state internally
                onClick={() => setCurrentView(item.view)}
                className="flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-colors text-muted-foreground hover:bg-muted"
                activeClassName="bg-primary/10 text-primary hover:bg-primary/20"
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 lg:p-12">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
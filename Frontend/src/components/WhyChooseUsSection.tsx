import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ICON_MISSION = "/assets/icons/mission.png";
const ICON_TEAM = "/assets/icons/team.png";
const ICON_PRIVACY = "/assets/icons/privacy.png";

export const WhyChooseUsSection = () => {
  return (
    <section className="bg-muted/50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Title */}
        <h2 className="text-4xl font-extrabold text-center mb-16 text-foreground">
          Why Choose CardioPredict?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* 1. Our Mission Card */}
          <Card className="shadow-2xl hover:shadow-primary/30 transition-shadow rounded-2xl border-none">
            <CardHeader className="text-center">
              <div className="w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <img
                src="/assests/icons/mission.png"
                alt="Mission Icon"
                className="w-140 h-140 object-fit"
              />
              </div>
              <CardTitle className="text-2xl font-bold">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-md text-muted-foreground">
                To <b><strong>democratize access</strong></b> to advanced cardiovascular risk assessment through AI-powered technology, helping individuals make informed health decisions.
              </CardDescription>
            </CardContent>
          </Card>

          {/* 2. Expert Team Card */}
          <Card className="shadow-2xl hover:shadow-primary/30 transition-shadow rounded-2xl border-none">
            <CardHeader className="text-center">
              <div className="w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <img
                src="/assests/icons/team.png"
                alt="Team Icon"
                className="w-full h-full object-contain"
              />
              </div>
              <CardTitle className="text-2xl font-bold">Expert Team</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-md text-muted-foreground">
                Our multidisciplinary team includes <b><strong>cardiologists, data scientists, and medical researchers</strong></b> dedicated to improving heart health outcomes.
              </CardDescription>
            </CardContent>
          </Card>

          {/* 3. Privacy First Card */}
          <Card className="shadow-2xl hover:shadow-primary/30 transition-shadow rounded-2xl border-none">
            <CardHeader className="text-center">
              <div className="w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <img
                src="/assests/icons/privacy.png"
                alt="Privacy Icon"
                className="w-64 h-64 object-contain"
              />
              </div>
              <CardTitle className="text-2xl font-bold">Privacy First</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-md text-muted-foreground">
                We prioritize your privacy with <b><strong>HIPAA-compliant</strong></b> security measures and never share your health data without explicit consent.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
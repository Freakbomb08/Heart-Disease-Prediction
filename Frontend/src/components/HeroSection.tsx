import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Shield, TrendingUp } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pt-24 pb-32 md:pt-32 md:pb-48 bg-[#E6F3F7] dark:bg-gray-900/80">

      <div className="absolute inset-0 opacity-70 dark:opacity-20 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(#00cec3_1px,transparent_1px)] [background-size:24px_24px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 text-center relative z-10">

        {/* Animated Heart Placeholder */}
        <div className="flex justify-center mb-10 h-[300px] md:h-[250px]">
          <div className="relative w-full max-w-sm h-full flex items-center justify-center">
            {/* The 3D heart visual would go here */}
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/assests/visuals/3d-heart.png"
                alt="3D cartoon heart pulsing with a scrolling ECG line"
                className="w-full h-full object-contain"
              />
            </div>
            {/* Conceptual Framer Motion component: <motion.div animate={{ scale: [1, 1.05, 1], transition: { duration: 1, repeat: Infinity } }} /> */}
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 tracking-tighter">
          Your Heart, Our AI: <br className="hidden sm:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-primary">
            A Smarter Path to Health.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 px-4">
          Understand your cardiovascular risk with playful AI insights and personalized recommendations.
        </p>

        {/* CTA */}
        <Link to="/dashboard">
          <Button size="lg" className="text-xl px-10 py-7 shadow-2xl transition-all hover:scale-[1.02] bg-teal-500 hover:bg-teal-600">
            Start My Heart Check
            <ArrowRight className="w-6 h-6 ml-3" />
          </Button>
        </Link>

        {/* Trust Indicators - Keep them simple and below the fold */}
        <div className="mt-16 text-sm text-muted-foreground">
          <div className="mt-16 flex flex-wrap justify-center gap-6 text-base font-medium text-foreground/80">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-teal-500" />
            <span>Trusted by Health Profesionals</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span>83% Accuracy</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-500" />
            <span>HIPAA Compliant Ppolicy</span>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};
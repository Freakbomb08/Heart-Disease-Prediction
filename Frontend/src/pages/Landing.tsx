import { HeroSection } from "@/components/HeroSection";
import { WhyChooseUsSection } from "@/components/WhyChooseUsSection";
import NavBar from "@/components/NavBar";
import HowItWorksSection from "@/components/HowItWorksSection";
import FinalCTASection from "@/components/FinalCTASection";
import FooterSection from "@/components/FooterSection";
import { useEffect, useState } from "react";

const Landing = () => {
  // Dark mode state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("darkMode");
      return stored === "true";
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <div className="min-h-screen">
      {/* 1. Navbar */}
      <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      {/* 2. Hero Section */}
      <HeroSection />

      {/* 3. Features Section */}
      <WhyChooseUsSection />

      {/* 4. How It Works Section */}
      <HowItWorksSection />

      {/* 5. Final CTA */}
      <FinalCTASection />

      {/* 6. Footer */}
      <FooterSection />
    </div >
  );
};

export default Landing;
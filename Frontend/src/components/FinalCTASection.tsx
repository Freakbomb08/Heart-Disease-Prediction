import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FinalCTASection = () => {
  return (
    <section className="py-20 bg-primary dark:bg-primary/90 text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
          Take Control of Your Health Today
        </h2>
        <p className="text-lg mb-8 opacity-90">
          A few minutes now could give you the clarity you need for a healthier future.
        </p>
        <Link to="/dashboard">
          <Button size="lg" className="text-xl px-10 py-7 bg-white text-primary hover:bg-gray-100 shadow-2xl">
            Begin Risk Assessment
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default FinalCTASection;

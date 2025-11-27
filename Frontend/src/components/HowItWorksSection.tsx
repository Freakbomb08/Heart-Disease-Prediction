export const HowItWorksSection = () => {
  return (
    <section className="bg-muted/50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          How It Works in 3 Simple Steps
        </h2>
        <div className="grid md:grid-cols-3 gap-12">

          {/* Step 1 */}
          <div className="relative text-center p-6 bg-card rounded-xl shadow-md border">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-primary-foreground">
              1
            </div>
            <h3 className="text-xl font-semibold mb-2">Input Your Data</h3>
            <p className="text-muted-foreground">
              Fill the multi-step assessment form with key vitals, medical history, and lab results.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative text-center p-6 bg-card rounded-xl shadow-md border">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-primary-foreground">
              2
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Model Processing</h3>
            <p className="text-muted-foreground">
              Our optimized ML algorithm runs the data through predictive analysis models in real-time.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative text-center p-6 bg-card rounded-xl shadow-md border">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-primary-foreground">
              3
            </div>
            <h3 className="text-xl font-semibold mb-2">View Report & Plan</h3>
            <p className="text-muted-foreground">
              Get a clear risk level, score, and a list of personalized recommendations for your doctor.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const FooterSection = () => {
  return (
    <footer className="border-t py-12 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-muted-foreground">
        {/* Logo & Disclaimer */}
        <div>
          <div className="flex items-center gap-2 mb-3 text-foreground">
            <Heart className="w-5 h-5 text-primary" />
            <span className="font-bold text-lg">CardioPredict</span>
          </div>
          <p className="text-xs">
            <b><strong>Disclaimer:</strong></b> This tool is for educational purposes only. It is not a substitute for professional medical diagnosis or treatment. Consult a physician for any health concerns.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-foreground mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link to="/dashboard" className="hover:text-primary">Start Assessment</Link></li>
            <li><Link to="/about" className="hover:text-primary">Our Mission</Link></li>
            <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-semibold text-foreground mb-3">Resources</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-primary">FAQ</a></li>
            <li><a href="#" className="hover:text-primary">Scientific Basis</a></li>
            <li><a href="#" className="hover:text-primary">Contact Support</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-foreground mb-3">Contact Us</h4>
          <p>Email: support@cardiopredict.com</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto text-center text-xs mt-8 pt-4 border-t border-muted-foreground/10">
        © 2025 CardioPredict. All rights reserved.
      </div>
    </footer>
  );
};

export default FooterSection;

import { ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="px-6 pb-8 pt-20 bg-bg-base relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto bg-[#0a0a0a] rounded-[32px] border border-white/5 p-10 md:p-16 flex flex-col relative z-10 overflow-hidden">
        
        {/* Powerful Glow from the bottom edge of the card */}
        <div className="absolute -bottom-[50%] left-1/2 -translate-x-1/2 w-[60%] h-full bg-glow-purple/50 blur-[100px] pointer-events-none rounded-[100%]"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-glow-purple to-transparent pointer-events-none shadow-[0_0_15px_rgba(147,112,219,1)]"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 relative z-10">
          
          {/* Left Column (Brand + CTA) */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo.png" alt="SilverSeat" className="h-12 w-auto object-contain" />
            </div>
            <p className="text-gray-400 max-w-sm mb-8 leading-relaxed text-sm">
              A modern platform to discover, book, and experience movies in one place.
            </p>
            <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors">
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Columns (Links) */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold text-white mb-6 text-sm">Product</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Demo</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-6 text-sm">Company</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-6 text-sm">Resources</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Docs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Legal</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-6 text-sm">Social</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600 border-t border-white/5 relative z-10">
          <p>© {new Date().getFullYear()} SilverSeat. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { Home, Sparkles, Search, Ticket, Settings } from "lucide-react";
import { useEffect, useState } from "react";

interface DashboardNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function DashboardNav({ activeTab, setActiveTab }: DashboardNavProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // The greeting is roughly 250px tall. We switch to fixed when scrolled past it.
      setIsScrolled(window.scrollY > 200);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "foryou", label: "For You", icon: Sparkles },
    { id: "search", label: "Search", icon: Search },
    { id: "bookings", label: "My Bookings", icon: Ticket },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      {/* Invisible spacer that appears when nav becomes fixed to prevent layout jump */}
      {isScrolled && <div className="h-14 mb-8" />}
      
      <div className={`flex justify-center mb-8 z-[100] transition-all duration-300 w-full overflow-hidden px-4 sm:px-0 ${isScrolled ? 'fixed top-4 left-1/2 -translate-x-1/2' : 'relative'}`}>
        <div className={`flex sm:inline-flex items-center w-full sm:w-auto overflow-x-auto no-scrollbar bg-white/5 border border-white/10 rounded-[32px] sm:rounded-full p-1.5 sm:p-1 backdrop-blur-md shadow-2xl transition-all duration-300 ${isScrolled ? 'bg-white/10 shadow-[0_10px_40px_-10px_rgba(255,255,255,0.1)]' : ''}`}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap shrink-0 flex-1 sm:flex-none ${
                isActive 
                  ? "bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-[0_4px_30px_rgba(255,255,255,0.1)]" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline-block">{tab.label}</span>
            </button>
          );
        })}
        </div>
      </div>
    </>
  );
}

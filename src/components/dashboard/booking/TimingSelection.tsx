import { useState } from "react";
import { Clock, MapPin, Info } from "lucide-react";

interface TimingSelectionProps {
  onSelect: (date: string, cinema: string, time: string) => void;
}

export default function TimingSelection({ onSelect }: TimingSelectionProps) {
  const dates = [
    { day: "FRI", date: "6" },
    { day: "SAT", date: "7", active: true },
    { day: "SUN", date: "8" },
    { day: "MON", date: "9" },
    { day: "TUE", date: "10" },
    { day: "WED", date: "11" },
    { day: "THU", date: "12" },
  ];

  const cinemas = [
    {
      name: "PVR: Oberoi Mall, Goregaon (E)",
      features: ["English", "2D"],
      times: ["10:33 am", "03:58 pm", "04:45 pm"]
    },
    {
      name: "Sun City: Vile Parle",
      features: ["English", "2D", "Hindi", "2D"],
      times: ["10:33 am", "03:58 pm", "04:45 pm"]
    },
    {
      name: "Bahar Cinema: Vile Parle (E)",
      features: ["Hindi", "2D"],
      times: ["10:33 am", "03:58 pm", "04:45 pm"]
    }
  ];

  const [activeDate, setActiveDate] = useState("7");

  return (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500 max-w-3xl mx-auto mt-8">
      
      {/* Date Picker */}
      <div className="relative rounded-3xl border border-white/10 mb-8 overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundColor: 'var(--color-glow-orange)' }} />
        
        <div className="relative z-10 flex sm:justify-between items-center p-2 gap-2 overflow-x-auto no-scrollbar">
          {dates.map((d) => (
            <button
              key={d.date}
              onClick={() => setActiveDate(d.date)}
              className={`min-w-[64px] sm:min-w-0 flex-1 py-3 sm:py-4 flex flex-col items-center justify-center transition-all duration-300 rounded-2xl shrink-0 sm:shrink ${
                activeDate === d.date 
                  ? "bg-glow-orange text-white shadow-[0_0_20px_var(--color-glow-orange)] scale-[1.02]" 
                  : "text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              <span className="text-[10px] sm:text-xs font-medium mb-1">{d.day}</span>
              <span className="text-lg sm:text-xl font-bold">{d.date}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Cinemas List */}
      <div className="space-y-6 pb-8">
        {cinemas.map((cinema, idx) => (
          <div key={idx} className="relative p-6 rounded-3xl border border-white/10 overflow-hidden shadow-2xl transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.02)] group">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md group-hover:bg-black/60 transition-colors duration-500" />
            <div className="absolute inset-0 opacity-[0.05] group-hover:opacity-[0.08] transition-opacity duration-500" style={{ backgroundColor: 'var(--color-glow-orange)' }} />
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-glow-orange" />
                    {cinema.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-2 flex gap-2">
                    {cinema.features.map((f, i) => (
                      <span key={i} className="px-3 py-1 rounded-full border border-white/10 bg-white/5 font-medium tracking-wide">{f}</span>
                    ))}
                  </p>
                </div>
                <Info className="w-5 h-5 text-gray-500 cursor-pointer hover:text-white transition-colors" />
              </div>
              
              <div className="flex flex-wrap gap-4 mt-6">
                {cinema.times.map((time) => (
                  <button
                    key={time}
                    onClick={() => onSelect(activeDate, cinema.name, time)}
                    className="px-5 py-2.5 rounded-xl border border-green-500/30 text-green-400 hover:bg-green-500 hover:border-green-500 hover:text-white hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] text-sm font-medium transition-all duration-300 flex items-center gap-2 hover:-translate-y-0.5"
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

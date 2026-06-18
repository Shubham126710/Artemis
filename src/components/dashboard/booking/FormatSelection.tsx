import { Film } from "lucide-react";

interface FormatSelectionProps {
  onSelect: (language: string, format: string) => void;
}

export default function FormatSelection({ onSelect }: FormatSelectionProps) {
  const options = [
    {
      language: "ENGLISH",
      formats: ["2D", "3D", "IMAX 3D"]
    },
    {
      language: "HINDI",
      formats: ["2D", "3D", "4D"]
    }
  ];

  return (
    <div className="animate-in fade-in zoom-in-95 duration-300 max-w-2xl mx-auto mt-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <Film className="w-8 h-8 text-glow-orange" />
          Select Language & Format
        </h2>
        <p className="text-gray-400">Choose your preferred cinematic experience</p>
      </div>

      <div className="space-y-10">
        {options.map((option) => (
          <div key={option.language} className="relative p-6 sm:p-8 rounded-3xl border border-white/10 overflow-hidden shadow-2xl transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.02)] group">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md group-hover:bg-black/60 transition-colors duration-500" />
            <div className="absolute inset-0 opacity-[0.05] group-hover:opacity-[0.08] transition-opacity duration-500" style={{ backgroundColor: 'var(--color-glow-orange)' }} />
            
            <div className="relative z-10">
              <h3 className="text-lg font-semibold text-gray-300 mb-6 tracking-widest">{option.language}</h3>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {option.formats.map((format) => (
                  <button
                    key={format}
                    onClick={() => onSelect(option.language, format)}
                    className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-2xl border border-white/20 bg-white/5 hover:bg-glow-orange hover:border-glow-orange hover:text-white text-sm sm:text-base font-medium transition-all duration-300 hover:shadow-[0_0_20px_var(--color-glow-orange)] hover:-translate-y-1"
                  >
                    {format}
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

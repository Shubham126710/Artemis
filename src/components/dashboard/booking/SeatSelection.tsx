import { useState } from "react";
import { Check } from "lucide-react";

interface SeatSelectionProps {
  onProceed: (seats: string[]) => void;
}

export default function SeatSelection({ onProceed }: SeatSelectionProps) {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const toggleSeat = (id: string) => {
    setSelectedSeats(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const getSeatPrice = (id: string) => {
    const row = id.charAt(0);
    if (['A', 'B', 'C'].includes(row)) return 450;
    if (['H', 'I', 'J', 'K', 'L'].includes(row)) return 350;
    return 0;
  };

  const totalPrice = selectedSeats.reduce((total, id) => total + getSeatPrice(id), 0);

  const renderRow = (rowLabel: string, leftCount: number, rightCount: number, price: number) => {
    return (
      <div className="flex items-center justify-center gap-6 mb-3" key={rowLabel}>
        <div className="w-4 text-xs font-bold text-gray-500">{rowLabel}</div>
        <div className="flex gap-2">
          {Array.from({ length: leftCount }).map((_, i) => {
            const id = `${rowLabel}${i + 1}`;
            const isSelected = selectedSeats.includes(id);
            return (
              <button
                key={id}
                onClick={() => toggleSeat(id)}
                className={`w-8 h-8 rounded text-xs font-medium transition-all duration-300 border ${
                  isSelected 
                    ? "bg-glow-orange border-glow-orange text-white shadow-[0_0_15px_var(--color-glow-orange)] scale-110" 
                    : "border-white/20 text-gray-400 hover:border-glow-orange hover:text-white bg-white/5 hover:scale-105"
                }`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
        <div className="w-8"></div> {/* Aisle */}
        <div className="flex gap-2">
          {Array.from({ length: rightCount }).map((_, i) => {
            const num = leftCount + i + 1;
            const id = `${rowLabel}${num}`;
            const isSelected = selectedSeats.includes(id);
            return (
              <button
                key={id}
                onClick={() => toggleSeat(id)}
                className={`w-8 h-8 rounded text-xs font-medium transition-all duration-300 border ${
                  isSelected 
                    ? "bg-glow-orange border-glow-orange text-white shadow-[0_0_15px_var(--color-glow-orange)] scale-110" 
                    : "border-white/20 text-gray-400 hover:border-glow-orange hover:text-white bg-white/5 hover:scale-105"
                }`}
              >
                {num}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 max-w-3xl mx-auto mt-8 pb-32">
      
      {/* Screen Curved Line */}
      <div className="relative h-16 w-full flex justify-center items-center mb-16 overflow-hidden">
        <div className="absolute w-[150%] h-32 border-t-[4px] border-glow-orange/30 rounded-[100%] top-0 blur-[1px]"></div>
        <div className="absolute w-[150%] h-32 border-t-[2px] border-glow-orange/60 rounded-[100%] top-0"></div>
        <div className="absolute top-4 text-xs font-bold tracking-widest text-glow-orange/60 uppercase">Screen This Way</div>
      </div>

      {/* Seat Map */}
      <div className="relative p-4 sm:p-8 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundColor: 'var(--color-glow-orange)' }} />
        
        <div className="overflow-x-auto no-scrollbar relative z-10 pb-4">
          <div className="min-w-max px-2">
            <div className="relative z-10 mb-8">
              <div className="text-sm font-semibold text-gray-400 mb-6 border-b border-white/10 pb-2 uppercase tracking-widest flex justify-between">
                <span>Executive</span> <span className="text-glow-orange">Rs. 450</span>
              </div>
              {renderRow("A", 3, 5, 450)}
              {renderRow("B", 2, 5, 450)}
              {renderRow("C", 2, 5, 450)}
            </div>

            <div className="relative z-10">
              <div className="text-sm font-semibold text-gray-400 mb-6 border-b border-white/10 pb-2 uppercase tracking-widest flex justify-between">
                <span>Premium</span> <span className="text-glow-orange">Rs. 350</span>
              </div>
              {renderRow("H", 4, 4, 350)}
              {renderRow("I", 4, 4, 350)}
              {renderRow("J", 4, 4, 350)}
              {renderRow("K", 4, 4, 350)}
              {renderRow("L", 4, 4, 350)}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Action Bar */}
      {selectedSeats.length > 0 && (
        <div className="sticky bottom-0 left-0 w-full rounded-t-3xl border-t border-white/10 p-6 z-50 animate-in slide-in-from-bottom-full duration-300 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] overflow-hidden mt-8">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundColor: 'var(--color-glow-orange)' }} />
          
          <div className="relative z-10 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex gap-6 sm:gap-12 items-center w-full sm:w-auto justify-between sm:justify-start">
              <div>
                <p className="text-xs sm:text-sm text-gray-400 font-medium mb-1">Selected Seats ({selectedSeats.length})</p>
                <p className="text-lg sm:text-xl font-bold text-white leading-none truncate max-w-[120px] sm:max-w-none">{selectedSeats.join(", ")}</p>
              </div>
              <div className="h-8 sm:h-10 w-px bg-white/20"></div>
              <div>
                <p className="text-xs sm:text-sm text-gray-400 font-medium mb-1">Total Amount</p>
                <p className="text-xl sm:text-2xl font-bold text-white leading-none">₹<span className="text-glow-orange">{totalPrice}</span></p>
              </div>
            </div>
            <button
              onClick={() => onProceed(selectedSeats)}
              className="w-full sm:w-auto bg-glow-orange px-8 py-3 sm:py-4 rounded-xl text-white font-bold tracking-wide hover:shadow-[0_0_20px_var(--color-glow-orange)] transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02]"
            >
              PROCEED TO PAY
              <Check className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

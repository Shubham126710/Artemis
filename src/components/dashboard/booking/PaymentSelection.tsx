import { useState, useEffect } from "react";
import { CreditCard, Wallet, ChevronDown, Tag, Loader2 } from "lucide-react";
import { Movie } from "@/lib/data";

interface PaymentSelectionProps {
  movieId: string;
  movies: Movie[];
  bookingData: {
    language: string;
    format: string;
    date: string;
    cinema: string;
    time: string;
    seats: string[];
  };
  onProceed: () => void;
}

export default function PaymentSelection({ movieId, movies, bookingData, onProceed }: PaymentSelectionProps) {
  const movie = movies.find(m => m.id === movieId);
  
  // Fake pricing logic
  const pricePerSeat = 350;
  const subtotal = bookingData.seats.length * pricePerSeat;
  const convenienceFee = 60;
  const total = subtotal + convenienceFee;

  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState<any[]>([]);
  const [cardsLoading, setCardsLoading] = useState(true);

  // Fetch saved cards on mount
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch("/api/user/cards");
        const data = await res.json();
        if (Array.isArray(data)) {
          setCards(data);
        }
      } catch (err) {
        console.error("Failed to fetch cards", err);
      }
      setCardsLoading(false);
    };
    fetchCards();
  }, []);

  const handlePay = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          movieId,
          cinema: bookingData.cinema,
          date: bookingData.date,
          time: bookingData.time,
          format: bookingData.format,
          language: bookingData.language,
          seats: bookingData.seats,
          totalPrice: total
        })
      });
      if (res.ok) {
        onProceed();
      } else {
        alert("Booking failed. Please try again.");
      }
    } catch(e) {
      alert("Booking failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500 max-w-2xl mx-auto mt-8 pb-32">
      
      {/* Order Summary Card */}
      <div className="glass p-6 rounded-3xl border border-white/10 mb-8 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-glow-orange/20 blur-3xl rounded-full"></div>
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6">Order Summary</h3>
        
        <div className="flex gap-6 items-start mb-6 border-b border-white/10 pb-6">
          <img src={movie?.image} alt={movie?.title} className="w-20 h-28 object-cover rounded-lg shadow-lg" />
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">{movie?.title}</h2>
            <p className="text-sm text-gray-400 mb-2">{bookingData.language} | {bookingData.format}</p>
            <p className="text-sm text-white font-medium mb-1">
              {bookingData.date}th • {bookingData.time}
            </p>
            <p className="text-xs text-gray-500">
              {bookingData.seats.length} Tickets • {bookingData.cinema}
            </p>
            <p className="text-sm font-bold text-glow-orange mt-2">
              Seats: {bookingData.seats.join(", ")}
            </p>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between text-gray-400">
            <span>Subtotal</span>
            <span>Rs. {subtotal}</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Convenience Fee</span>
            <span>Rs. {convenienceFee}</span>
          </div>
          <div className="flex justify-between text-white font-bold text-lg pt-3 border-t border-white/10">
            <span>Total Payable</span>
            <span>Rs. {total}</span>
          </div>
        </div>
      </div>

      {/* Payment Options */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">Payment Method</h3>
        
        {/* Credit Card Options */}
        {cardsLoading ? (
          <div className="flex justify-center p-4">
            <Loader2 className="w-6 h-6 animate-spin text-glow-orange" />
          </div>
        ) : cards.length > 0 ? (
          cards.map((card, index) => (
            <label key={card.id} className="flex items-center gap-4 glass p-4 rounded-xl border border-white/10 hover:border-glow-orange/50 cursor-pointer transition-colors has-[:checked]:bg-glow-orange/5 has-[:checked]:border-glow-orange/50">
              <input type="radio" name="payment" value={card.id} className="w-5 h-5 accent-glow-orange" defaultChecked={card.isDefault || index === 0} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-blue-400" />
                  <span className="font-bold text-white">{card.brand} ***{card.last4}</span>
                  {card.isDefault && <span className="ml-2 text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-300">Default</span>}
                </div>
                <p className="text-xs text-gray-500 mt-1">Exp {card.expMonth}/{card.expYear}</p>
              </div>
              <input 
                type="password" 
                placeholder="CVV" 
                maxLength={4}
                className="w-16 bg-white/10 border border-white/20 rounded text-center px-2 py-1 text-sm text-white outline-none focus:border-glow-orange" 
              />
            </label>
          ))
        ) : (
          <div className="glass p-4 rounded-xl border border-white/10 text-center">
            <p className="text-sm text-gray-400">No saved cards found. Please add a card in your Settings.</p>
          </div>
        )}

        {/* Wallet Option */}
        <label className="flex items-center gap-4 glass p-4 rounded-xl border border-white/10 hover:border-white/30 cursor-pointer transition-colors">
          <input type="radio" name="payment" className="w-5 h-5 accent-glow-orange" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-red-400" />
              <span className="font-bold text-white">Silver Wallet</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Balance: Rs. 500.00</p>
          </div>
        </label>

        <button className="w-full py-3 text-sm font-semibold text-glow-orange hover:text-white transition-colors uppercase tracking-widest flex items-center justify-center gap-2">
          More Payment Options <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Offers & Pay */}
      <div className="fixed bottom-0 left-0 w-full bg-black/90 backdrop-blur-xl border-t border-white/10 p-4 z-50 animate-in slide-in-from-bottom-full duration-300">
        <div className="max-w-2xl mx-auto flex gap-4">
          <button className="flex-1 py-4 border border-white/20 rounded-xl text-white font-bold text-sm hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
            <Tag className="w-4 h-4" /> AVAIL OFFERS
          </button>
          <button 
            onClick={handlePay}
            disabled={loading}
            className="flex-1 py-4 bg-glow-orange rounded-xl text-white font-bold text-lg hover:shadow-[0_0_20px_var(--color-glow-orange)] hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : `PAY ₹ ${total}`}
          </button>
        </div>
      </div>

    </div>
  );
}

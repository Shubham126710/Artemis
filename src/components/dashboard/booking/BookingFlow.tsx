import { useState, useEffect, useMemo } from "react";
import { ArrowLeft, X } from "lucide-react";
import { FastAverageColor } from "fast-average-color";
import MovieDetails from "./MovieDetails";
import FormatSelection from "./FormatSelection";
import TimingSelection from "./TimingSelection";
import SeatSelection from "./SeatSelection";
import PaymentSelection from "./PaymentSelection";
import BookingSuccess from "./BookingSuccess";

import { Movie } from "@/lib/data";

type Step = "DETAILS" | "FORMAT" | "TIMING" | "SEAT" | "PAYMENT" | "SUCCESS";

interface BookingFlowProps {
  movieId: string;
  movies: Movie[];
  onClose: () => void;
}

export default function BookingFlow({ movieId, movies, onClose }: BookingFlowProps) {
  const [step, setStep] = useState<Step>("DETAILS");
  const [bookingData, setBookingData] = useState({
    language: "",
    format: "",
    date: "",
    cinema: "",
    time: "",
    seats: [] as string[]
  });

  const movie = useMemo(() => movies.find(m => m.id === movieId), [movieId, movies]);
  const [accentColor, setAccentColor] = useState<string>('#FF5733'); // Default glow-orange

  useEffect(() => {
    if (movie && movie.image) {
      const fac = new FastAverageColor();
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      // Use proxy to bypass CORS for external TMDB images
      img.src = movie.image.startsWith('http') 
        ? `/api/proxy-image?url=${encodeURIComponent(movie.image)}` 
        : movie.image;
      img.onload = () => {
        try {
          const color = fac.getColor(img);
          setAccentColor(color.hex);
        } catch (e) {
          // fallback
        }
      };
    }
  }, [movie]);

  const handleDetailsProceed = () => {
    setStep("FORMAT");
  };

  const handleFormatSelect = (language: string, format: string) => {
    setBookingData(prev => ({ ...prev, language, format }));
    setStep("TIMING");
  };

  const handleTimingSelect = (date: string, cinema: string, time: string) => {
    setBookingData(prev => ({ ...prev, date, cinema, time }));
    setStep("SEAT");
  };

  const handleSeatProceed = (seats: string[]) => {
    setBookingData(prev => ({ ...prev, seats }));
    setStep("PAYMENT");
  };

  const handlePaymentProceed = () => {
    setStep("SUCCESS");
  };

  const goBack = () => {
    if (step === "SUCCESS") onClose();
    else if (step === "PAYMENT") setStep("SEAT");
    else if (step === "SEAT") setStep("TIMING");
    else if (step === "TIMING") setStep("FORMAT");
    else if (step === "FORMAT") setStep("DETAILS");
    else onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-[200] overflow-y-auto animate-in fade-in duration-300"
      style={{ '--color-glow-orange': accentColor } as React.CSSProperties}
    >
      {/* Dynamic Cinematic Gradient Background */}
      <div className="fixed inset-0 pointer-events-none z-[-1] bg-[#050505]" />
      <div 
        className="fixed inset-0 pointer-events-none z-[-1] opacity-40 mix-blend-screen"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, var(--color-glow-orange) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, var(--color-glow-orange) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, var(--color-glow-orange) 0%, transparent 60%)
          `
        }}
      />
      <div className="fixed inset-0 pointer-events-none z-[-1] backdrop-blur-[100px] bg-black/60" />

      {/* Top Navbar for Booking Flow (Hide on Success) */}
      {step !== "SUCCESS" && (
        <div className="sticky top-0 w-full bg-black/80 backdrop-blur-xl border-b border-white/10 z-40 p-4">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <button 
              onClick={goBack}
              className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors flex items-center gap-2 text-gray-300"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium hidden sm:block">Back</span>
            </button>
            
            <div className="text-center">
              <h2 className="text-xl font-bold text-white">
                {step === "DETAILS" ? "Movie Details" : "Book Tickets"}
              </h2>
              {step !== "DETAILS" && step !== "FORMAT" && (
                <p className="text-xs text-glow-orange mt-1">
                  {bookingData.language} • {bookingData.format}
                  {(step === "SEAT" || step === "PAYMENT") && ` • ${bookingData.date}th • ${bookingData.time}`}
                </p>
              )}
            </div>

            <button 
              onClick={onClose}
              className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-4 sm:p-8">
        {step === "DETAILS" && <MovieDetails movieId={movieId} movies={movies} onProceed={handleDetailsProceed} />}
        {step === "FORMAT" && <FormatSelection onSelect={handleFormatSelect} />}
        {step === "TIMING" && <TimingSelection onSelect={handleTimingSelect} />}
        {step === "SEAT" && <SeatSelection onProceed={handleSeatProceed} />}
        {step === "PAYMENT" && <PaymentSelection movieId={movieId} movies={movies} bookingData={bookingData} onProceed={handlePaymentProceed} />}
        {step === "SUCCESS" && <BookingSuccess movieId={movieId} movies={movies} bookingData={bookingData} onClose={onClose} />}
      </div>

    </div>
  );
}

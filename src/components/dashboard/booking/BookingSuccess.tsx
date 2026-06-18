import { QrCode, Mail, Share2, Users } from "lucide-react";
import { Movie } from "@/lib/data";

interface BookingSuccessProps {
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
  onClose: () => void;
}

export default function BookingSuccess({ movieId, movies, bookingData, onClose }: BookingSuccessProps) {
  const movie = movies.find(m => m.id === movieId);

  return (
    <div className="animate-in zoom-in-95 duration-500 max-w-md mx-auto mt-4 text-center">
      
      <h2 className="text-3xl font-bold text-white mb-6">Tickets Booked!</h2>

      {/* Ticket Card */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl relative text-left">
        {/* Ticket Header Section */}
        <div className="p-6 pb-8 border-b-2 border-dashed border-gray-300 relative bg-slate-50">
          <div className="flex gap-4">
            <img src={movie?.image} alt={movie?.title} className="w-24 h-36 object-cover rounded-xl shadow-md" />
            <div className="flex-1 mt-2">
              <h3 className="text-xl font-bold text-slate-900 mb-1">{movie?.title} ({movie?.certificate})</h3>
              <p className="text-sm text-slate-500 mb-3">{bookingData.language}, {bookingData.format}</p>
              
              <p className="font-bold text-slate-800 text-sm">
                Fri, {bookingData.date} Jan | {bookingData.time}
              </p>
              <p className="text-xs text-slate-500 mt-1">{bookingData.cinema}</p>
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center bg-slate-100 p-4 rounded-xl border border-slate-200">
            <div className="text-center border-r border-slate-300 pr-6">
              <span className="block text-2xl font-black text-slate-900 leading-none">{bookingData.seats.length}</span>
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Tickets</span>
            </div>
            <div className="pl-2">
              <p className="text-xs text-slate-500 uppercase tracking-wide">Screen 04 - Premium</p>
              <p className="font-bold text-lg text-slate-900">{bookingData.seats.join(", ")}</p>
            </div>
          </div>

          {/* Ticket Stamp Effect */}
          <div className="absolute -right-4 -bottom-10 opacity-20 pointer-events-none transform rotate-[-15deg]">
            <div className="border-4 border-green-600 rounded-lg p-2 text-green-600 font-black text-2xl tracking-widest uppercase inline-block">
              BOOKED
            </div>
          </div>
          
          {/* Side cutouts for the ticket effect */}
          <div className="absolute -left-4 bottom-[-16px] w-8 h-8 bg-black rounded-full"></div>
          <div className="absolute -right-4 bottom-[-16px] w-8 h-8 bg-black rounded-full"></div>
        </div>

        {/* Ticket QR Section */}
        <div className="p-8 bg-white flex flex-col items-center">
          <QrCode className="w-32 h-32 text-slate-900 mb-4" strokeWidth={1} />
          <p className="text-lg font-black tracking-widest text-slate-900 mb-6">WW30216WQ</p>
          <p className="text-xs text-slate-500 text-center px-4 leading-relaxed">
            Ticket details are sent on SMS. You can access the ticket from "My Bookings" or Show QR Code at Cinema hall.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-3 mt-8">
        <button className="flex flex-col items-center justify-center gap-2 p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors text-white group">
          <Users className="w-5 h-5 text-glow-orange group-hover:scale-110 transition-transform" />
          <span className="text-[10px] uppercase tracking-wider font-semibold">Invite<br/>Friends</span>
        </button>
        <button className="flex flex-col items-center justify-center gap-2 p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors text-white group">
          <Share2 className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
          <span className="text-[10px] uppercase tracking-wider font-semibold">Split<br/>Booking</span>
        </button>
        <button className="flex flex-col items-center justify-center gap-2 p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors text-white group">
          <Mail className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform" />
          <span className="text-[10px] uppercase tracking-wider font-semibold">Resend<br/>Ticket</span>
        </button>
      </div>

      <button 
        onClick={onClose}
        className="mt-8 text-sm text-gray-400 hover:text-white underline underline-offset-4"
      >
        Back to Dashboard
      </button>

    </div>
  );
}

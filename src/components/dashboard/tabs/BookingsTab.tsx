import { useState, useEffect } from "react";
import { Movie } from "@/lib/data";

interface BookingsTabProps {
  movies: Movie[];
}

export default function BookingsTab({ movies }: BookingsTabProps) {
  const [bookings, setBookings] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/bookings").then(res => res.json()),
      fetch("/api/wishlist").then(res => res.json())
    ]).then(([bookingsData, wishlistData]) => {
      if (Array.isArray(bookingsData)) setBookings(bookingsData);
      if (Array.isArray(wishlistData)) setWishlist(wishlistData);
      setLoading(false);
    }).catch(err => {
      console.error("Failed to fetch data:", err);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-gray-500 animate-pulse">Loading tickets...</div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
        Your Upcoming Bookings
      </h2>
      
      {bookings.length === 0 ? (
        <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/5">
          <p className="text-gray-400">No bookings yet. Time to catch a movie!</p>
        </div>
      ) : (
        bookings.map((booking) => {
          // If the movie relation was populated, use it. Otherwise try to find it from the passed movies array
          const m = booking.movie || movies.find(m => m.id === booking.movieId);
          const seats = JSON.parse(booking.seats || "[]");
          const isPast = new Date(booking.date) < new Date();

          return (
            <div key={booking.id} className={`glass p-6 rounded-2xl flex flex-col sm:flex-row gap-6 items-center relative overflow-hidden border transition-all duration-500 ${isPast ? 'border-white/5 opacity-60 grayscale-[50%] hover:grayscale-0 hover:opacity-100' : 'border-white/10 hover:border-white/30 cursor-pointer group'}`}>
              {!isPast && <div className="absolute top-0 right-0 w-32 h-32 bg-glow-crimson/20 blur-3xl rounded-full transition-transform group-hover:scale-150 duration-700"></div>}
              
              <img src={m?.image || "https://via.placeholder.com/500x750"} alt="Movie" className="w-24 h-36 object-cover rounded-lg shadow-lg relative z-10" />
              
              <div className="flex-1 relative z-10 w-full">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{m?.title || 'Unknown Movie'}</h3>
                  <span className="px-3 py-1 bg-white/10 text-xs rounded-full border border-white/10 text-white font-medium">{booking.format}</span>
                </div>
                <p className="text-gray-400 text-sm mb-4">{booking.date}, {booking.time} • {booking.cinema}</p>
                <div className="flex gap-6 text-sm font-medium">
                  <div>
                    <span className="text-gray-500 block text-xs mb-1">Seats</span>
                    <span className="text-white">{seats.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-xs mb-1">Total</span>
                    <span className="text-white">₹{booking.totalPrice}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-center justify-center border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-6 relative z-10 min-w-[100px]">
                <img src="/icons.svg" alt="QR Code" className="w-16 h-16 opacity-50 grayscale contrast-200" />
                <span className="text-[10px] text-gray-500 mt-2 uppercase tracking-widest">{booking.status}</span>
              </div>
            </div>
          );
        })
      )}

      <h2 className="text-2xl font-semibold mt-12 mb-6" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
        Your Wishlist
      </h2>
      
      {wishlist.length === 0 ? (
        <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/5">
          <p className="text-gray-400">Your wishlist is empty. Explore and save movies for later!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {wishlist.map((item) => {
            const m = item.movie || movies.find(m => m.id === item.movieId);
            if (!m) return null;
            return (
              <div key={item.id} className="glass rounded-xl overflow-hidden relative group cursor-pointer border border-white/10 hover:border-white/30 transition-all">
                <img src={m.image} alt={m.title} className="w-full aspect-[2/3] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-0 left-0 w-full p-4">
                  <h3 className="font-bold text-white text-sm line-clamp-1">{m.title}</h3>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

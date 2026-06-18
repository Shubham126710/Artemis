"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import DashboardNav from "@/components/dashboard/DashboardNav";
import HomeTab from "@/components/dashboard/tabs/HomeTab";
import BookingsTab from "@/components/dashboard/tabs/BookingsTab";
import SearchTab from "@/components/dashboard/tabs/SearchTab";
import SettingsTab from "@/components/dashboard/tabs/SettingsTab";
import ForYouTab from "@/components/dashboard/tabs/ForYouTab";
import BookingFlow from "@/components/dashboard/booking/BookingFlow";
import { Gift, Bell, X } from "lucide-react";
import { Movie } from "@/lib/data"; // Import the type

export default function Dashboard() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isBypass, setIsBypass] = useState(false);
  
  // Dashboard State
  const [activeTab, setActiveTab] = useState("home");
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isPromoOpen, setIsPromoOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  
  // Interactive Promo & Notification State
  const [copiedPromoId, setCopiedPromoId] = useState<string | null>(null);
  const [promos] = useState([
    { id: '1', title: 'IMAX BOGO', desc: 'Buy 1 Get 1 Free on all IMAX formats this weekend.', code: 'IMAXBOGO' },
    { id: '2', title: 'SNACK ATTACK', desc: '20% off all Popcorn & Beverages combos.', code: 'SNACK20' },
    { id: '3', title: 'STUDENT SPECIAL', desc: 'Flat ₹100 off on any movie ticket with valid student ID.', code: 'STUDENT100' },
    { id: '4', title: 'DATE NIGHT', desc: 'Free classic salted popcorn with booking of 2 premium seats.', code: 'DATENIGHT' },
  ]);

  const [notifications, setNotifications] = useState([
    { id: 'n1', title: 'New Release Available! 🎉', desc: 'Bookings for "F1" are now open. Reserve your favorite seats before they run out.', time: '2 hours ago', read: false },
    { id: 'n2', title: 'Booking Rescheduled ⚠️', desc: 'Your viewing of "Superman" has been moved to Screen 2. Timings remain the same.', time: 'Yesterday', read: false },
  ]);

  const handleCopyPromo = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedPromoId(id);
    setTimeout(() => setCopiedPromoId(null), 2000);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    setMounted(true);
    if (document.cookie.includes("bypass_auth=true")) {
      setIsBypass(true);
    }
    
    // Fetch movies from DB API
    fetch("/api/movies")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setMovies(data);
        } else {
          console.error("API returned non-array:", data);
        }
      })
      .catch(err => console.error("Failed to fetch movies:", err));
  }, []);

  // Dynamic Greeting Logic
  const getGreeting = (name: string) => {
    const hour = new Date().getHours();
    const firstName = name.split(' ')[0] || "Guest";
    
    const morningGreetings = [
      `Good morning, ${firstName}.`,
      `Rise and shine, ${firstName}.`,
      `A beautiful morning, ${firstName}.`
    ];
    const afternoonGreetings = [
      `Good afternoon, ${firstName}.`,
      `Enjoy your afternoon, ${firstName}.`,
      `Welcome back, ${firstName}.`
    ];
    const eveningGreetings = [
      `Good evening, ${firstName}.`,
      `Ready for a masterpiece, ${firstName}?`,
      `A perfect evening for cinema, ${firstName}.`
    ];
    const nightGreetings = [
      `Late night screening, ${firstName}?`,
      `The night is young, ${firstName}.`,
      `Midnight showing, ${firstName}.`
    ];

    let pool = eveningGreetings;
    if (hour >= 5 && hour < 12) pool = morningGreetings;
    else if (hour >= 12 && hour < 17) pool = afternoonGreetings;
    else if (hour >= 17 && hour < 22) pool = eveningGreetings;
    else pool = nightGreetings;

    // We use a simple consistent hash so it doesn't flicker on every re-render but can be dynamic
    // For simplicity we just use the hour to pick an index
    return pool[hour % pool.length];
  };

  const effectiveSession = session || (isBypass ? { user: { name: "Shubham", email: "shubham@bypass.com" } } : null);

  useEffect(() => {
    if (mounted && !isPending && !effectiveSession) {
      router.push("/login");
    }
  }, [effectiveSession, isPending, mounted, router]);

  if (!mounted || (isPending && !isBypass)) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;
  }

  if (!effectiveSession) return null;

  // We split the greeting to isolate the name for highlighting
  const rawGreeting = getGreeting(effectiveSession.user.name || "Guest");
  const namePart = effectiveSession.user.name?.split(' ')[0] || "Guest";
  const greetingPrefix = rawGreeting.split(namePart)[0];
  const greetingSuffix = rawGreeting.split(namePart)[1] || "";

  return (
    <div className="min-h-screen bg-bg-base text-gray-100 font-sans p-4 sm:p-8 relative">
      
      <div 
        className="absolute top-0 left-0 w-full h-[70vh] pointer-events-none z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/dashboard.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0b0c10]/60 to-[#0b0c10]" />
        {/* Subtle noise overlay for texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
        {/* Ribbed Glass Scanline Effect */}
        <div className="absolute inset-0 opacity-[0.08]" style={{ background: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px)' }}></div>
      </div>

      {/* The rest of the page background will just fall back to the solid dark color set by bg-[#0b0c10] */}
      <div className="fixed inset-0 pointer-events-none z-[-1] bg-[#0b0c10]" />

      <div className="relative z-10">
        {/* Top Nav */}
        <nav className="flex items-center justify-between mb-8 max-w-6xl mx-auto pt-4 relative z-[200]">
          <Link href="/">
            <img src="/logo.png" alt="SilverSeat" className="h-8 object-contain" />
          </Link>
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-1 sm:gap-2 mr-2 sm:mr-4">
              {/* Promo Tab */}
              <div className="relative">
                <button 
                  onClick={() => { setIsPromoOpen(!isPromoOpen); setIsNotifOpen(false); setIsProfileOpen(false); }}
                  className="p-2 sm:p-2.5 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-glow-orange relative"
                >
                  <Gift className="w-5 h-5" />
                </button>

                {isPromoOpen && (
                  <div className="absolute top-full right-0 mt-2 w-72 sm:w-80 bg-[#121212]/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl z-[60] overflow-hidden">
                    <div className="px-4 py-3 border-b border-white/10">
                      <p className="text-sm font-bold text-white">Offers & Promos</p>
                    </div>
                    <div className="p-3 max-h-80 overflow-y-auto no-scrollbar space-y-2">
                      {promos.map(promo => (
                        <div key={promo.id} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                          <p className="text-xs font-bold text-gray-200 uppercase tracking-wider mb-2">{promo.title}</p>
                          <p className="text-sm text-gray-400 mb-3 leading-relaxed">{promo.desc}</p>
                          <div className="bg-black/40 rounded-lg px-3 py-2 flex justify-between items-center border border-white/5">
                            <code className="text-sm text-white font-mono tracking-widest">{promo.code}</code>
                            <button 
                              onClick={() => handleCopyPromo(promo.code, promo.id)}
                              className="text-xs text-gray-300 font-bold hover:text-white transition-colors"
                            >
                              {copiedPromoId === promo.id ? "COPIED!" : "COPY"}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Notification Tab */}
              <div className="relative">
                <button 
                  onClick={() => { setIsNotifOpen(!isNotifOpen); setIsPromoOpen(false); setIsProfileOpen(false); }}
                  className="p-2 sm:p-2.5 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white relative"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 border border-black"></span>
                  )}
                </button>

                {isNotifOpen && (
                  <div className="absolute top-full right-0 mt-2 w-72 sm:w-80 bg-[#121212]/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl z-[60] overflow-hidden">
                    <div className="px-4 py-3 border-b border-white/10 flex justify-between items-center">
                      <p className="text-sm font-bold text-white">Notifications</p>
                      <div className="flex gap-3">
                        <button onClick={() => setNotifications(notifications.map(n => ({...n, read: true})))} className="text-xs text-gray-400 hover:text-white transition-colors">Mark all read</button>
                        <button onClick={() => setNotifications([])} className="text-xs text-gray-400 hover:text-white transition-colors">Clear all</button>
                      </div>
                    </div>
                    <div className="p-3 max-h-80 overflow-y-auto no-scrollbar space-y-2">
                      {notifications.length === 0 ? (
                        <div className="py-8 text-center text-gray-500 text-sm">No new notifications</div>
                      ) : (
                        notifications.map(notif => (
                          <div key={notif.id} className={`relative p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors ${notif.read ? 'opacity-60 hover:opacity-100' : ''}`}>
                            <button onClick={() => setNotifications(notifications.filter(n => n.id !== notif.id))} className="absolute top-3 right-3 text-gray-500 hover:text-white">
                              <X className="w-4 h-4" />
                            </button>
                            <p className="text-sm font-medium text-white mb-2 pr-6">{notif.title}</p>
                            <p className="text-xs text-gray-400 leading-relaxed">{notif.desc}</p>
                            <p className="text-[10px] text-gray-500 mt-3 font-medium">{notif.time}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Dropdown */}
              <div className="relative ml-2 sm:ml-4">
                <button 
                  onClick={() => { setIsProfileOpen(!isProfileOpen); setIsPromoOpen(false); setIsNotifOpen(false); }}
                  className="flex items-center gap-3 hover:bg-white/5 p-1 sm:p-1.5 sm:pr-3 rounded-full transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-400 via-gray-200 to-gray-400 flex items-center justify-center text-sm font-bold shadow-lg shadow-white/10 text-black">
                    {effectiveSession.user.name?.charAt(0) || "U"}
                  </div>
                  <span className="text-sm font-semibold text-gray-300 hidden sm:block">{effectiveSession.user.name}</span>
                </button>
                
                {isProfileOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl py-2 z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-white/10">
                      <p className="text-sm font-medium text-white truncate">{effectiveSession.user.name}</p>
                      <p className="text-xs text-gray-400 truncate">{effectiveSession.user.email}</p>
                    </div>
                    <button 
                      onClick={() => {
                        setActiveTab("settings");
                        setIsProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      Account Settings
                    </button>
                  </div>
                )}
              </div>
            </div>
            <button 
              onClick={async () => {
                await authClient.signOut();
                document.cookie = "bypass_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                router.push("/login");
              }}
              className="text-sm font-medium px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/40 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all text-gray-300 hover:text-white"
            >
              Sign Out
            </button>
          </div>
        </nav>

        <main className="max-w-6xl mx-auto">
          
          {/* Greeting */}
          <div className="mb-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000 mt-12">
            <h1 
              className="text-5xl sm:text-6xl mb-3 text-gray-300 drop-shadow-lg italic"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, letterSpacing: "-0.01em" }}
            >
              {greetingPrefix}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-white to-gray-300 font-medium">
                {namePart}
              </span>
              {greetingSuffix}
            </h1>
          </div>

          {/* Tab Navigation */}
          <DashboardNav activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Tab Content */}
          <div className="mt-4">
            {activeTab === "home" && <HomeTab movies={movies} onBookMovie={setSelectedMovieId} />}
            {activeTab === "foryou" && <ForYouTab movies={movies} onBookMovie={setSelectedMovieId} setActiveTab={setActiveTab} />}
            {activeTab === "search" && <SearchTab movies={movies} onBookMovie={setSelectedMovieId} />}
            {activeTab === "bookings" && <BookingsTab movies={movies} />}
            {activeTab === "settings" && <SettingsTab />}
          </div>
        </main>

        {/* Booking Overlay */}
        {selectedMovieId && (
          <BookingFlow 
            movieId={selectedMovieId} 
            movies={movies}
            onClose={() => setSelectedMovieId(null)} 
          />
        )}
      </div>
    </div>
  );
}

"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isBypass, setIsBypass] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (document.cookie.includes("bypass_auth=true")) {
      setIsBypass(true);
    }
  }, []);

  const effectiveSession = session || (isBypass ? { user: { name: "Dev User", email: "dev@bypass.com" } } : null);

  useEffect(() => {
    if (mounted && !isPending && !effectiveSession) {
      router.push("/login");
    }
  }, [effectiveSession, isPending, mounted, router]);

  if (!mounted || (isPending && !isBypass)) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;
  }

  if (!effectiveSession) return null;

  return (
    <div className="min-h-screen bg-bg-base text-gray-100 font-sans p-8">
      <nav className="flex items-center justify-between mb-12">
        <Link href="/">
          <img src="/logo.png" alt="SilverSeat" className="h-8 object-contain" />
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
            Home
          </Link>
          <button 
            onClick={async () => {
              await authClient.signOut();
              // Also clear bypass cookie
              document.cookie = "bypass_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              router.push("/login");
            }}
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            Sign Out
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="col-span-1 glass-card p-6 border border-white/10 rounded-2xl bg-white/5">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-glow-orange to-glow-purple flex items-center justify-center text-xl font-bold">
              {effectiveSession.user.name?.charAt(0) || "U"}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{effectiveSession.user.name}</h2>
              <p className="text-gray-400 text-sm">{effectiveSession.user.email}</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Role</span>
              <span className="font-medium text-glow-amber">Premium Member</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Status</span>
              <span className="text-green-400">Active</span>
            </div>
          </div>
        </div>

        {/* Bookings */}
        <div className="col-span-1 md:col-span-2 space-y-6">
          <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Your Upcoming Bookings</h2>
          
          {/* Mock Ticket 1 */}
          <div className="glass p-6 rounded-2xl flex flex-col sm:flex-row gap-6 items-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-glow-crimson/20 blur-3xl rounded-full"></div>
            <img src="/hero.jpg" alt="Movie" className="w-24 h-32 object-cover rounded-lg shadow-lg" />
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold">Dune: Part Two</h3>
                <span className="px-3 py-1 bg-white/10 text-xs rounded-full border border-white/10">IMAX 70mm</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">Tomorrow, 7:30 PM • AMC Lincoln Square</p>
              <div className="flex gap-4 text-sm font-medium">
                <div>
                  <span className="text-gray-500 block text-xs">Seats</span>
                  <span>J14, J15</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-xs">Screen</span>
                  <span>Screen 1</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mock Ticket 2 */}
          <div className="glass p-6 rounded-2xl flex flex-col sm:flex-row gap-6 items-center relative overflow-hidden opacity-70">
            <img src="/loading.jpg" alt="Movie" className="w-24 h-32 object-cover rounded-lg shadow-lg" />
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold">Oppenheimer</h3>
                <span className="px-3 py-1 bg-white/10 text-xs rounded-full border border-white/10">Standard</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">Past • Sep 12, 2025 • Regal Cinemas</p>
              <div className="flex gap-4 text-sm font-medium">
                <div>
                  <span className="text-gray-500 block text-xs">Seats</span>
                  <span>F10</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

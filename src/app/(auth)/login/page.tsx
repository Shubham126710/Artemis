"use client";

import AuthForm from "@/components/auth/AuthForm";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const [greeting, setGreeting] = useState("Welcome Back");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setGreeting("Good morning");
    else if (hour >= 12 && hour < 17) setGreeting("Happy booking");
    else if (hour >= 17 && hour < 21) setGreeting("Good evening");
    else setGreeting("Have a great night");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Top Navigation Controls */}
      <div className="absolute top-4 left-4 right-4 z-50 flex justify-between items-center">
        <Link 
          href="/" 
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs rounded-full border border-white/10 backdrop-blur-md transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <button 
          onClick={() => {
            document.cookie = "bypass_auth=true; path=/";
            window.location.href = "/dashboard";
          }}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs rounded-full border border-white/20 backdrop-blur-md transition-colors"
        >
          Bypass Auth (Dev)
        </button>
      </div>

      {/* Lava Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -bottom-1/2 -right-1/4 w-[120%] h-[120%] rounded-full opacity-60 animate-pulse blur-[100px]" 
          style={{ 
            background: 'radial-gradient(ellipse at center, rgba(234, 88, 12, 0.4) 0%, rgba(190, 18, 60, 0.2) 40%, transparent 70%)',
            animationDuration: '5s' 
          }}>
        </div>
        <div 
          className="absolute top-1/4 -left-1/4 w-[100%] h-[100%] rounded-full opacity-40 animate-pulse blur-[100px]" 
          style={{ 
            background: 'radial-gradient(ellipse at center, rgba(217, 119, 6, 0.3) 0%, transparent 60%)',
            animationDuration: '7s', 
            animationDelay: '1s' 
          }}>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="text-center mb-8">
          <h1 
            className="text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400 italic font-light mb-3 pb-2 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {greeting}
          </h1>
          <p className="text-gray-400 text-sm">Sign in to book your premium seats.</p>
        </div>

        <AuthForm />

        <div className="mt-8 text-center">
          <p className="text-[10px] text-gray-500 max-w-xs mx-auto leading-relaxed">
            By signing in, you agree to our <a href="#" className="underline hover:text-gray-300">Terms & Privacy Policy</a>.
            Unauthorized use is prohibited.
          </p>
        </div>
      </div>
    </div>
  );
}

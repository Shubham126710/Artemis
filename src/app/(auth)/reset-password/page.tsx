"use client";

import { useState, Suspense } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";

function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return setError("Invalid or missing token");
    if (password.length < 8) return setError("Password must be at least 8 characters");

    setLoading(true);
    setError(null);
    const { error } = await authClient.resetPassword({
      newPassword: password,
      token,
    });
    setLoading(false);

    if (error) {
      setError(error.message || "Failed to reset password");
    } else {
      router.push("/login");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error && <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">{error}</div>}
      
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
          className="w-full bg-black/40 border border-white/10 rounded-full px-5 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30 transition-colors"
        />
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-white text-black font-semibold rounded-full py-3 mt-2 hover:bg-gray-200 transition-colors disabled:opacity-50"
      >
        {loading ? "Resetting..." : "Save New Password"}
      </button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Lava Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -bottom-1/2 -right-1/4 w-[120%] h-[120%] rounded-full opacity-60 animate-pulse blur-[100px]" 
          style={{ 
            background: 'radial-gradient(ellipse at center, rgba(234, 88, 12, 0.4) 0%, rgba(190, 18, 60, 0.2) 40%, transparent 70%)',
            animationDuration: '5s' 
          }}>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-md px-6 text-center">
        <h1 
          className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400 italic font-light mb-3 pb-2 leading-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Reset Password
        </h1>
        <p className="text-gray-400 text-sm mb-8">Enter your new secure password below.</p>

        <Suspense fallback={<div className="text-gray-400">Loading form...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}

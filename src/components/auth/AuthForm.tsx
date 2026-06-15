"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, registerSchema, type LoginInput, type RegisterInput } from "@/lib/validators";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const loginForm = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const registerForm = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const [resetEmail, setResetEmail] = useState("");

  const onSubmitLogin = async (data: LoginInput) => {
    setLoading(true);
    setError(null);
    const { error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
    });
    setLoading(false);
    if (error) {
      setError(error.message || "Failed to sign in");
    } else {
      router.push("/dashboard");
    }
  };

  const onSubmitRegister = async (data: RegisterInput) => {
    setLoading(true);
    setError(null);
    const { error } = await authClient.signUp.email({
      email: data.email,
      password: data.password,
      name: data.fullName,
    });
    setLoading(false);
    if (error) {
      setError(error.message || "Failed to register");
    } else {
      router.push("/dashboard");
    }
  };

  const onForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) return setError("Please enter your email");
    setLoading(true);
    setError(null);
    try {
      // @ts-ignore - Better Auth types not fully inferred
      const { error } = await authClient.forgetPassword({
        email: resetEmail,
        redirectTo: "/reset-password",
      });
      setLoading(false);
      if (error) {
        setError(error.message || "Failed to send reset link");
      } else {
        setResetSent(true);
      }
    } catch (err: any) {
      setLoading(false);
      setError(err.message || "Failed to send reset link");
    }
  };

  const socialLogin = async (provider: "google" | "microsoft" | "apple") => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/dashboard",
      });
      if (error) {
        setError(`Error: ${error.message}`);
      }
    } catch (err: any) {
      setError(`Unexpected Error: ${err?.message || "Unknown error occurred"}`);
    }
    setLoading(false);
  };

  if (isForgotPassword) {
    return (
      <div className="w-full">
        {error && <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">{error}</div>}
        
        {resetSent ? (
          <div className="text-center">
            <p className="text-green-400 mb-4 text-sm bg-green-500/10 p-4 rounded-xl border border-green-500/20">
              A password reset link has been sent to your email. Check your terminal logs!
            </p>
            <button
              onClick={() => { setIsForgotPassword(false); setResetSent(false); }}
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Back to Login
            </button>
          </div>
        ) : (
          <form onSubmit={onForgotPassword} className="space-y-4">
            <p className="text-gray-400 text-sm text-center mb-4">Enter your email to reset your password.</p>
            <div>
              <input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="Email address"
                className="w-full bg-black/40 border border-white/10 rounded-full px-5 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black font-semibold rounded-full py-3 mt-2 hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => setIsForgotPassword(false)}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Toggle */}
      <div className="flex justify-center mb-6">
        <div className="bg-white/5 rounded-full p-1 flex border border-white/10">
          <button
            onClick={() => { setIsLogin(true); setError(null); }}
            className={`px-6 py-1.5 rounded-full text-sm font-medium transition-colors ${isLogin ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setIsLogin(false); setError(null); }}
            className={`px-6 py-1.5 rounded-full text-sm font-medium transition-colors ${!isLogin ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Register
          </button>
        </div>
      </div>

      {error && <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">{error}</div>}

      {isLogin ? (
        <form onSubmit={loginForm.handleSubmit(onSubmitLogin)} className="space-y-4">
          <div>
            <input
              {...loginForm.register("email")}
              type="email"
              placeholder="Email"
              className="w-full bg-black/40 border border-white/10 rounded-full px-5 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30 transition-colors"
            />
            {loginForm.formState.errors.email && <p className="text-red-400 text-xs mt-1 px-2">{loginForm.formState.errors.email.message}</p>}
          </div>
          <div>
            <input
              {...loginForm.register("password")}
              type="password"
              placeholder="Password"
              className="w-full bg-black/40 border border-white/10 rounded-full px-5 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30 transition-colors"
            />
            {loginForm.formState.errors.password && <p className="text-red-400 text-xs mt-1 px-2">{loginForm.formState.errors.password.message}</p>}
          </div>
          
          <div className="flex justify-end px-2">
            <button
              type="button"
              onClick={() => setIsForgotPassword(true)}
              className="text-xs text-gray-400 hover:text-white transition-colors"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-semibold rounded-full py-3 mt-2 hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      ) : (
        <form onSubmit={registerForm.handleSubmit(onSubmitRegister)} className="space-y-4">
          <div>
            <input
              {...registerForm.register("fullName")}
              type="text"
              placeholder="Full Name"
              className="w-full bg-black/40 border border-white/10 rounded-full px-5 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30 transition-colors"
            />
            {registerForm.formState.errors.fullName && <p className="text-red-400 text-xs mt-1 px-2">{registerForm.formState.errors.fullName.message}</p>}
          </div>
          <div>
            <input
              {...registerForm.register("email")}
              type="email"
              placeholder="Email"
              className="w-full bg-black/40 border border-white/10 rounded-full px-5 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30 transition-colors"
            />
            {registerForm.formState.errors.email && <p className="text-red-400 text-xs mt-1 px-2">{registerForm.formState.errors.email.message}</p>}
          </div>
          <div>
            <input
              {...registerForm.register("password")}
              type="password"
              placeholder="Password"
              className="w-full bg-black/40 border border-white/10 rounded-full px-5 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30 transition-colors"
            />
            {registerForm.formState.errors.password && <p className="text-red-400 text-xs mt-1 px-2">{registerForm.formState.errors.password.message}</p>}
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-semibold rounded-full py-3 mt-2 hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {loading ? "Registering..." : "Create Account"}
          </button>
        </form>
      )}

      <div className="flex items-center my-8">
        <div className="flex-1 border-t border-white/10"></div>
        <span className="px-4 text-xs text-gray-500">or</span>
        <div className="flex-1 border-t border-white/10"></div>
      </div>

      <div className="flex justify-center">
        <button onClick={() => socialLogin('google')} className="w-full h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center gap-3 hover:bg-white/10 transition-colors font-medium">
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
          </svg>
          Continue with Google
        </button>
      </div>
    </div>
  );
}

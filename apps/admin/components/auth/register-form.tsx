"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Shield,
  TrendingUp,
  Users,
  Check,
  X,
  ArrowRight,
  Zap,
} from "lucide-react";
import { GoogleIcon } from "../icons/google-icon";

const SELLER_REGISTER_URL = "http://localhost:3000/auth/register";

export function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const passwordMatch = password === confirmPassword && password.length > 0;
  const isFormValid = name && email && password && confirmPassword && passwordMatch;

  const handleRegister = async () => {
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          confirmPassword,
          role: "ADMIN",
        }),
      });

      if (!res.ok) {
        const message = await res.text();

        if (message.startsWith("ROLE_MISMATCH:SELLER")) {
          window.open(SELLER_REGISTER_URL, "_blank", "noopener,noreferrer");
          setError("This is a seller account. Continue on the seller tab.");
          return;
        }

        setError(message || "Registration failed. Please try again.");
        return;
      }

      window.location.href = "/";
    } catch {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = () => {
    void signIn("google", { callbackUrl: "/auth/callback?intent=ADMIN" });
  };

  return (
    <div className="relative flex min-h-dvh overflow-hidden bg-[#030712] text-white">
      {/* Ambient Background Effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-[300px] -top-[300px] size-[600px] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute -bottom-[200px] -right-[200px] size-[500px] rounded-full bg-cyan-500/15 blur-[100px]" />
        <div className="absolute left-1/2 top-1/2 size-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[80px]" />
      </div>

      {/* Left Panel - Branding */}
      <div className="relative hidden w-1/2 lg:flex lg:flex-col lg:justify-between lg:p-12">
        {/* Grid Pattern */}
        <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] [background-size:64px_64px]" />

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/25">
              <Zap className="size-5 text-white" />
            </div>
            <span className="text-xl font-semibold tracking-tight">WholeSale</span>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-lg">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 backdrop-blur-sm">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-blue-500" />
            </span>
            <span className="text-sm font-medium text-blue-300">Admin Portal</span>
          </div>

          <h1 className="text-balance text-5xl font-bold leading-[1.1] tracking-tight">
            Build Your
            <span className="mt-2 block bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Command Center
            </span>
          </h1>

          <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-zinc-400">
            Set up your admin account and start managing your platform with powerful tools and insights.
          </p>

          {/* Features */}
          <div className="mt-12 space-y-4">
            {[
              { icon: Shield, text: "Enterprise-grade security", desc: "Bank-level encryption" },
              { icon: TrendingUp, text: "Advanced analytics", desc: "Real-time insights" },
              { icon: Users, text: "Seller management", desc: "Full control panel" },
            ].map(({ icon: Icon, text, desc }) => (
              <div
                key={text}
                className="group flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.1] hover:bg-white/[0.04]"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
                  <Icon className="size-5 text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-white">{text}</p>
                  <p className="text-sm text-zinc-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-sm text-zinc-600">
          © 2024 WholeSale. All rights reserved.
        </div>
      </div>

      {/* Right Panel - Register Form */}
      <div className="relative flex flex-1 items-center justify-center px-6 py-12 lg:px-12">
        <div className="w-full max-w-[420px]">
          {/* Mobile Logo */}
          <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
            <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/25">
              <Zap className="size-5 text-white" />
            </div>
            <span className="text-xl font-semibold tracking-tight">WholeSale</span>
          </div>

          {/* Form Card */}
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 shadow-2xl shadow-black/40 backdrop-blur-2xl">
            {/* Header */}
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold tracking-tight">Create your account</h2>
              <p className="mt-2 text-sm text-zinc-500">
                Get started with your admin dashboard
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                <div className="size-1.5 rounded-full bg-red-500" />
                {error}
              </div>
            )}

            {/* Role Toggle */}
            <div className="mb-6 flex gap-1 rounded-xl border border-white/[0.06] bg-white/[0.02] p-1">
              <button
                type="button"
                onClick={() => window.open(SELLER_REGISTER_URL, "_blank", "noopener,noreferrer")}
                className="flex-1 cursor-pointer rounded-lg py-2.5 text-sm font-medium text-zinc-500 transition-all duration-200 hover:bg-white/[0.04] hover:text-zinc-300"
              >
                Seller
              </button>
              <button
                type="button"
                className="flex-1 cursor-default rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20"
              >
                Admin
              </button>
            </div>

            {/* Input Fields */}
            <div className="mb-6 space-y-4">
              {/* Name */}
              <div className="group relative">
                <User className="absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-zinc-600 transition-colors group-focus-within:text-blue-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  className="h-13 w-full rounded-xl border border-white/[0.08] bg-white/[0.02] pl-12 pr-4 text-[15px] text-white placeholder:text-zinc-600 outline-none transition-all duration-200 focus:border-blue-500/50 focus:bg-white/[0.04] focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              {/* Email */}
              <div className="group relative">
                <Mail className="absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-zinc-600 transition-colors group-focus-within:text-blue-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@company.com"
                  className="h-13 w-full rounded-xl border border-white/[0.08] bg-white/[0.02] pl-12 pr-4 text-[15px] text-white placeholder:text-zinc-600 outline-none transition-all duration-200 focus:border-blue-500/50 focus:bg-white/[0.04] focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              {/* Password */}
              <div className="group relative">
                <Lock className="absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-zinc-600 transition-colors group-focus-within:text-blue-400" />
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create password"
                  className="h-13 w-full rounded-xl border border-white/[0.08] bg-white/[0.02] pl-12 pr-12 text-[15px] text-white placeholder:text-zinc-600 outline-none transition-all duration-200 focus:border-blue-500/50 focus:bg-white/[0.04] focus:ring-4 focus:ring-blue-500/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((p) => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 transition-colors hover:text-zinc-300"
                >
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="group relative">
                <Lock className="absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-zinc-600 transition-colors group-focus-within:text-blue-400" />
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="h-13 w-full rounded-xl border border-white/[0.08] bg-white/[0.02] pl-12 pr-20 text-[15px] text-white placeholder:text-zinc-600 outline-none transition-all duration-200 focus:border-blue-500/50 focus:bg-white/[0.04] focus:ring-4 focus:ring-blue-500/10"
                />
                <div className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-2">
                  {confirmPassword && (
                    <div
                      className={`flex size-5 items-center justify-center rounded-full ${
                        passwordMatch
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {passwordMatch ? <Check size={12} /> : <X size={12} />}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowConfirm((p) => !p)}
                    className="text-zinc-600 transition-colors hover:text-zinc-300"
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Register Button */}
            <button
              onClick={handleRegister}
              disabled={loading || !isFormValid}
              className="group relative mb-4 flex h-13 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-[15px] font-semibold text-white shadow-xl shadow-blue-500/25 transition-all duration-300 hover:shadow-blue-500/40 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative flex items-center gap-2">
                {loading ? (
                  <>
                    <svg className="size-5 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </span>
            </button>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
              <span className="text-xs font-medium text-zinc-600">OR</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
            </div>

            {/* Google Register */}
            <button
              onClick={handleGoogleRegister}
              className="group flex h-13 w-full items-center justify-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] text-[15px] font-medium text-zinc-300 transition-all duration-200 hover:border-white/[0.12] hover:bg-white/[0.06]"
            >
              <GoogleIcon className="size-5" />
              Continue with Google
            </button>

            {/* Login Link */}
            <p className="mt-8 text-center text-sm text-zinc-500">
              Already have an account?{" "}
              <button
                onClick={() => (window.location.href = "/auth/login")}
                className="font-medium text-blue-400 transition-colors hover:text-blue-300"
              >
                Sign in
              </button>
            </p>
          </div>

          {/* Terms */}
          <p className="mt-6 text-center text-xs text-zinc-600">
            By creating an account, you agree to our{" "}
            <a href="#" className="text-zinc-500 hover:text-zinc-400">Terms</a>
            {" "}and{" "}
            <a href="#" className="text-zinc-500 hover:text-zinc-400">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}

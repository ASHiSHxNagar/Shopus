"use client";

import { useState } from "react";
import { getSession, signIn } from "next-auth/react";
import { Eye, EyeOff, Mail, Lock, Zap, Users, BarChart3, ArrowRight } from "lucide-react";
import { GoogleIcon } from "../icons/google-icon";

const SELLER_LOGIN_URL = "http://localhost:3000/auth/login";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        portal: "ADMIN",
        redirect: false,
      });

      if (res?.error?.startsWith("ROLE_MISMATCH:SELLER")) {
        window.open(SELLER_LOGIN_URL, "_blank", "noopener,noreferrer");
        setError("This is a seller account. Continue on the seller tab.");
        return;
      }

      if (res?.error) {
        setError("Invalid email or password");
        return;
      }

      const session = await getSession();

      if (session?.user?.role === "SELLER") {
        window.location.href = SELLER_LOGIN_URL.replace("/auth/login", "/");
        return;
      }

      window.location.href = "/";
    } catch {
      setError("Unable to sign in right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
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
            Control Every
            <span className="mt-2 block bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Wholesale Layer
            </span>
          </h1>

          <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-zinc-400">
            Sign in to your command center. Manage sellers, operations, and platform performance with precision.
          </p>

          {/* Stats Cards */}
          <div className="mt-12 flex gap-4">
            {[
              { icon: Users, label: "Active Sellers", value: "2.4k+" },
              { icon: Zap, label: "Daily Orders", value: "18k" },
              { icon: BarChart3, label: "Revenue", value: "$1.2M" },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <Icon className="relative mb-3 size-5 text-blue-400" />
                <p className="relative text-2xl font-bold text-white">{value}</p>
                <p className="relative mt-1 text-sm text-zinc-500">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-sm text-zinc-600">
          © 2024 WholeSale. All rights reserved.
        </div>
      </div>

      {/* Right Panel - Login Form */}
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
              <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
              <p className="mt-2 text-sm text-zinc-500">
                Enter your credentials to access your account
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
                onClick={() => window.open(SELLER_LOGIN_URL, "_blank", "noopener,noreferrer")}
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
              <div className="group relative">
                <Mail className="absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-zinc-600 transition-colors group-focus-within:text-blue-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="h-13 w-full rounded-xl border border-white/[0.08] bg-white/[0.02] pl-12 pr-4 text-[15px] text-white placeholder:text-zinc-600 outline-none transition-all duration-200 focus:border-blue-500/50 focus:bg-white/[0.04] focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              <div className="group relative">
                <Lock className="absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-zinc-600 transition-colors group-focus-within:text-blue-400" />
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
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
            </div>

            {/* Forgot Password */}
            <div className="mb-6 flex justify-end">
              <button className="text-sm text-zinc-500 transition-colors hover:text-blue-400">
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={loading || !email || !password}
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
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
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

            {/* Google Login */}
            <button
              onClick={handleGoogleLogin}
              className="group flex h-13 w-full items-center justify-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] text-[15px] font-medium text-zinc-300 transition-all duration-200 hover:border-white/[0.12] hover:bg-white/[0.06]"
            >
              <GoogleIcon className="size-5" />
              Continue with Google
            </button>

            {/* Register Link */}
            <p className="mt-8 text-center text-sm text-zinc-500">
              Don&apos;t have an account?{" "}
              <button
                onClick={() => (window.location.href = "/auth/register")}
                className="font-medium text-blue-400 transition-colors hover:text-blue-300"
              >
                Create account
              </button>
            </p>
          </div>

          {/* Terms */}
          <p className="mt-6 text-center text-xs text-zinc-600">
            By signing in, you agree to our{" "}
            <a href="#" className="text-zinc-500 hover:text-zinc-400">Terms</a>
            {" "}and{" "}
            <a href="#" className="text-zinc-500 hover:text-zinc-400">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { getSession, signIn } from "next-auth/react";
import { Eye, EyeOff, Mail, Lock, Zap, TrendingUp, Users } from "lucide-react";

const ADMIN_LOGIN_URL = "http://localhost:3001/auth/login";

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
      <path d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.95 4 4 12.95 4 24s8.95 20 20 20c11 0 20-9 20-20 0-1.2-.1-2.5-.4-3.5z" fill="#FFC107"/>
      <path d="M6.3 14.7l6.6 4.8C14.7 16.1 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" fill="#FF3D00"/>
      <path d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.3 35.3 26.8 36 24 36c-5.3 0-9.7-3.3-11.3-8H6.1C9.5 39.6 16.2 44 24 44z" fill="#4CAF50"/>
      <path d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.6l6.2 5.2C41.1 36.3 44 30.6 44 24c0-1.2-.1-2.5-.4-3.5z" fill="#1976D2"/>
    </svg>
  );
}

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      portal: "SELLER",
      redirect: false,
    });

    if (res?.error?.startsWith("ROLE_MISMATCH:ADMIN")) {
      window.open(ADMIN_LOGIN_URL, "_blank", "noopener,noreferrer");
      setError("This is an admin account. Use admin panel.");
      setLoading(false);
      return;
    }

    if (res?.error) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    const session = await getSession();

    if (session?.user?.role === "ADMIN") {
      window.location.href = "http://localhost:3001/";
      return;
    }

    window.location.href = "/";
    setLoading(false);
  };

  return (
    <div className="relative flex min-h-dvh overflow-hidden bg-[#050810] text-white">
      {/* Ambient orbs */}
      <div className="pointer-events-none absolute -top-32 -left-32 size-96 rounded-full bg-gradient-to-br from-blue-500/30 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-40 size-80 rounded-full bg-gradient-to-tl from-cyan-500/20 to-transparent blur-3xl" />

      {/* ── LEFT PANEL (lg+) ── */}
      <div className="relative hidden w-1/2 items-center justify-center bg-linear-to-br from-blue-950/40 to-[#050810] lg:flex">
        {/* Grid texture */}
        <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(59,130,246,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,.04)_1px,transparent_1px)] [background-size:48px_48px]" />

        <div className="relative z-10 max-w-sm px-10 text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-[11px] font-semibold tracking-widest text-blue-300">
            <span className="size-1.5 animate-pulse rounded-full bg-blue-400" />
            SELLER PORTAL
          </span>

          <h1 className="mt-4 text-5xl font-extrabold leading-tight tracking-tight">
            Grow Your
            <span className="block bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Wholesale Business
            </span>
          </h1>

          <p className="mt-5 text-sm leading-relaxed text-zinc-500">
            Manage inventory, orders, and customers from one powerful dashboard.
          </p>

          {/* Stats row */}
          <div className="mt-10 flex justify-center gap-3">
            {[
              { icon: TrendingUp, label: "Revenue", value: "$2.5M+" },
              { icon: Users, label: "Merchants", value: "5.2k" },
              { icon: Zap, label: "Orders/mo", value: "48k" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-center">
                <Icon className="mx-auto mb-2 size-4 text-blue-400" />
                <p className="text-sm font-bold text-white">{value}</p>
                <p className="text-[10px] text-zinc-600">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="relative flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/60 backdrop-blur-2xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-[11px] font-semibold tracking-widest text-blue-300">
              <span className="size-1.5 animate-pulse rounded-full bg-blue-400" />
              SELLER PORTAL
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">Welcome Back</h2>
            <p className="mt-1 text-sm text-zinc-500">Access your seller dashboard</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-center text-sm text-red-300">
              {error}
            </div>
          )}

          {/* Role toggle */}
          <div className="mb-6 flex gap-1 rounded-xl border border-white/8 bg-white/[0.04] p-1">
            <button
              type="button"
              className="flex-1 rounded-lg bg-linear-to-r from-blue-500 to-cyan-500 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition"
            >
              Seller
            </button>
            <button
              type="button"
              onClick={() => window.open(ADMIN_LOGIN_URL, "_blank", "noopener,noreferrer")}
              className="flex-1 cursor-pointer rounded-lg py-2.5 text-sm text-zinc-400 transition hover:bg-white/8 hover:text-white"
            >
              Admin
            </button>
          </div>

          {/* Inputs */}
          <div className="mb-6 flex flex-col gap-4">
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 size-4 text-zinc-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="h-11 w-full rounded-lg border border-white/10 bg-white/[0.04] pl-10 pr-4 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 size-4 text-zinc-500" />
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-11 w-full rounded-lg border border-white/10 bg-white/[0.04] pl-10 pr-11 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"
              />
              <button
                type="button"
                onClick={() => setShowPw((p) => !p)}
                className="absolute right-3.5 top-3.5 text-zinc-500 transition hover:text-zinc-300"
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Login button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="mb-4 h-11 w-full rounded-lg bg-linear-to-r from-blue-500 to-cyan-500 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging in…" : "Sign In"}
          </button>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3 text-xs text-zinc-700">
            <span className="h-px flex-1 bg-white/8" />
            or continue with
            <span className="h-px flex-1 bg-white/8" />
          </div>

          {/* Google */}
          <button
            onClick={() => signIn("google", { callbackUrl: "/auth/callback?intent=SELLER" })}
            className="mb-6 flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] text-sm text-zinc-200 transition hover:border-white/20 hover:bg-white/10"
          >
            <GoogleIcon />
              Continue with Google
          </button>

          <p className="text-center text-sm text-zinc-600">
            New to Shopus?{" "}
            <span
              className="cursor-pointer text-blue-400 hover:underline"
              onClick={() => (window.location.href = "/auth/register")}
            >
              Create account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

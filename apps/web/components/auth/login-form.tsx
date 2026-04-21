"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen flex bg-black text-white">

      {/* LEFT SIDE (branding - desktop only) */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center bg-gradient-to-br from-blue-900/30 to-black">

        {/* Glow */}
        <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full" />

        <div className="relative z-10 text-center max-w-md px-10 space-y-6">
          <h1 className="text-4xl font-bold leading-tight">
            Build Your Wholesale Empire 🚀
          </h1>

          <p className="text-zinc-400 text-lg">
            Manage products, suppliers, and orders — all in one place.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-1 items-center justify-center px-4 my-4">

        <div className="w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-xl space-y-6">

          {/* TITLE */}
          <div className="space-y-1 text-center">
            <h2 className="text-3xl font-semibold">Welcome back</h2>
            <p className="text-zinc-400 text-sm">
              Login to continue
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-red-400 text-sm text-center">
              {error}
            </p>
          )}

          {/* EMAIL */}
          <div className="space-y-2">
            <label className="text-sm text-zinc-300">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 pl-5 pr-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* PASSWORD */}
          <div className="space-y-2">
            <label className="text-sm text-zinc-300">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 pl-5 pr-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* OPTIONS */}
          <div className="flex items-center justify-between text-sm text-zinc-400">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-blue-500" />
              Remember me
            </label>

            <span className="hover:text-blue-400 cursor-pointer transition">
              Forgot password?
            </span>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full h-12 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 font-medium cursor-pointer hover:opacity-90 transition shadow-lg shadow-blue-500/20"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          {/* DIVIDER */}
          <div className="flex items-center gap-3 text-zinc-500 text-sm">
            <div className="h-px bg-zinc-700 flex-1" />
            OR
            <div className="h-px bg-zinc-700 flex-1" />
          </div>

          {/* GOOGLE BUTTON */}
          <button className="w-full h-12 rounded-lg border border-white/10 cursor-pointer hover:bg-white/5 transition">
            Continue with Google
          </button>

          {/* FOOTER */}
          <p className="text-center text-sm text-zinc-500">
            Don’t have an account?{" "}
            <span
              className="text-blue-400 cursor-pointer hover:underline"
              onClick={() => (window.location.href = "/auth/register")}
            >
              Sign up
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";

export function RegisterForm() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleRegister = async () => {
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
          confirmPassword: confirm,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLoading(false);

      if (!res.ok) {
        setError("Failed to create account");
      } else {
        window.location.href = "/auth/login";
      }
    } catch {
      setLoading(false);
      setError("Server error");
    }
  };

  return (
    <div className="min-h-screen flex bg-black text-white">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center bg-gradient-to-br from-blue-900/30 to-black">

        {/* glow */}
        <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full" />

        <div className="relative z-10 text-center max-w-md px-10 space-y-6">
          <h1 className="text-4xl font-bold leading-tight">
            Start Your Journey 🚀
          </h1>

          <p className="text-zinc-400 text-lg">
            Create your account and unlock powerful tools to grow your business.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-1 items-center justify-center px-4 my-4">

        <div className="w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-xl space-y-6">

          {/* TITLE */}
          <div className="text-center space-y-1">
            <h2 className="text-3xl font-semibold">
              Create Account
            </h2>
            <p className="text-zinc-400 text-sm">
              Join Shopus today
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-red-400 text-sm text-center">
              {error}
            </p>
          )}

          {/* NAME */}
          <div className="space-y-2">
            <label className="text-sm text-zinc-300">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-12 pl-5 pr-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* EMAIL */}
          <div className="space-y-2">
            <label className="text-sm text-zinc-300">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 pl-5 pr-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* PASSWORD */}
          <div className="space-y-2">
            <label className="text-sm text-zinc-300">Password</label>
            <input
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 pl-5 pr-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* CONFIRM */}
          <div className="space-y-2">
            <label className="text-sm text-zinc-300">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full h-12 pl-5 pr-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full h-12 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 cursor-pointer font-medium hover:opacity-90 transition shadow-lg shadow-blue-500/20"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

          {/* LOGIN LINK */}
          <p className="text-center text-sm text-zinc-500">
            Already have an account?{" "}
            <span
              className="text-blue-400 cursor-pointer hover:underline"
              onClick={() => (window.location.href = "/auth/login")}
            >
              Login
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}
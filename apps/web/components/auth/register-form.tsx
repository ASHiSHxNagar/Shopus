"use client";

import { useState } from "react";
import { PasswordInput } from "@/components/ui/password-input";
import { signIn } from "next-auth/react";
import { GoogleIcon } from "@/components/icons/google-icon";

export function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState<"SELLER" | "ADMIN">("SELLER");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  

  const handleRegister = async () => {
    setError("");
    setLoading(true);

    // 🔥 ADMIN redirect
    if (role === "ADMIN") {
      window.location.href = "/admin/register";
      return;
    }

    if (password !== confirm) {
  setError("Passwords do not match");
  return;
}

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
          role,
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
              className="w-full h-12 pl-5 pr-4 rounded-lg bg-white/5 border border-white/10 focus:ring-2 focus:ring-blue-500"
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
              className="w-full h-12 pl-5 pr-4 rounded-lg bg-white/5 border border-white/10 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* PASSWORD */}
          <PasswordInput
  value={password}
  onChange={setPassword}
  placeholder="Create password"
/>
          {/* CONFIRM PASSWORD */}

<PasswordInput
  value={confirm}
  onChange={setConfirm}
  placeholder="Confirm password"
/>

          {/* 🔥 ROLE SELECT (NEW) */}
          <div className="space-y-2">
            <label className="text-sm text-zinc-300">Account Type</label>

            <div className="flex bg-white/5 border border-white/10 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setRole("SELLER")}
                className={`flex-1 py-2 rounded-md text-sm ${
                  role === "SELLER"
                    ? "bg-blue-600 text-white"
                    : "text-zinc-400"
                }`}
              >
                Seller
              </button>

              <button
                type="button"
                onClick={() => setRole("ADMIN")}
                className={`flex-1 py-2 rounded-md text-sm ${
                  role === "ADMIN"
                    ? "bg-blue-600 text-white"
                    : "text-zinc-400"
                }`}
              >
                Admin
              </button>
            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full h-12 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 cursor-pointer font-medium hover:opacity-90 transition shadow-lg shadow-blue-500/20"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

          <button
  onClick={() => signIn("google", {
  callbackUrl: "/auth/callback",
})}
  className="w-full h-12 cursor-pointer rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition flex items-center justify-center gap-2"
>
  <GoogleIcon />
  Continue with Google
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
"use client";

import { useState } from "react";
import { getSession, signIn } from "next-auth/react";
import { PasswordInput } from "@/components/ui/password-input";
import { GoogleIcon } from "@/components/icons/google-icon";

export  function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [role, setRole] = useState<"SELLER" | "ADMIN">("SELLER");

  const handleLogin = async () => {
  setLoading(true);
  setError("");

  const res = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  if (res?.error) {
    setLoading(false);
    setError("Invalid credentials");
    return;
  }

  // 🔥 session निकाल
  const session = await getSession();

  setLoading(false);

  const role = session?.user?.role;

  if (role === "ADMIN") {
    window.location.href = "/admin";
  } else {
    window.location.href = "/dashboard";
  }
};
  return (
    <div className="min-h-screen flex bg-black text-white">

      {/* LEFT */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center bg-linear-to-br from-blue-900/30 to-black">
        <div className="absolute w-125 h-125 bg-blue-500/20 blur-[120px] rounded-full" />

        <div className="relative z-10 text-center max-w-md px-10 space-y-6">
          <h1 className="text-4xl font-bold">
            Welcome Back 👋
          </h1>
          <p className="text-zinc-400">
            Login and continue your journey
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-1 items-center justify-center px-4">

        <div className="w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-xl space-y-6">

          <h2 className="text-3xl text-center font-semibold">
            Login
          </h2>

          {error && (
            <p className="text-red-400 text-center text-sm">{error}</p>
          )}
          <div className="flex bg-white/5 border border-white/10 rounded-lg p-1">
  <button
    onClick={() => setRole("SELLER")}
    className={role === "SELLER" ? "bg-blue-600 flex-1" : "flex-1"}
  >
    Seller
  </button>

  <button
    onClick={() => setRole("ADMIN")}
    className={role === "ADMIN" ? "bg-blue-600 flex-1" : "flex-1"}
  >
    Admin
  </button>
</div>

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 px-4 rounded-lg bg-white/5 border border-white/10 focus:ring-2 focus:ring-blue-500"
          />

          <PasswordInput
            value={password}
            onChange={setPassword}
            placeholder="Password"
          />

          {/* LOGIN BUTTON */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full h-12 rounded-lg bg-linear-to-r from-blue-500 to-cyan-500 hover:opacity-90 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* GOOGLE LOGIN */}
         <button
onClick={() => {
  localStorage.setItem("selectedRole", role);
  signIn("google", { callbackUrl: "/auth/callback" });
}}
  className="w-full cursor-pointer h-12 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition flex items-center justify-center gap-2"
>
  <GoogleIcon />
  Continue with Google
</button>
          {/* REGISTER */}
          <p className="text-center text-sm text-zinc-400">
            Don’t have an account?{" "}
            <span
              className="text-blue-400 cursor-pointer"
              onClick={() => (window.location.href = "/auth/register")}
            >
              Register
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}
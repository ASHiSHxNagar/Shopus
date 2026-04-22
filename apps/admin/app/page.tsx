"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function AdminHome() {
  const { data, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      window.location.href = "/auth/login";
      return;
    }

    if (data?.user?.role === "SELLER") {
      window.location.href = "http://localhost:3000/";
    }
  }, [data?.user?.role, status]);

  if (status === "loading") {
    return (
      <div className="min-h-screen grid place-items-center bg-black text-zinc-300">
        Loading admin workspace...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl" />

      <section className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-16 text-center">
        <p className="mb-5 inline-flex rounded-full border border-blue-400/40 bg-blue-500/10 px-4 py-1 text-xs tracking-[0.2em] text-blue-200">
          SHOPUS ADMIN
        </p>

        <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
          Operate Wholesale Systems
          <span className="bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            {" "}
            Like a Pro
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-zinc-300 md:text-lg">
          Monitor users, govern seller operations, and keep your wholesale platform stable at scale.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="rounded-lg bg-linear-to-r from-blue-500 to-cyan-500 px-7 py-3 font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:opacity-90"
          >
            Open Admin Console
          </Link>

          <Link
            href="/auth/login"
            className="rounded-lg border border-zinc-700 bg-zinc-900/50 px-7 py-3 font-medium text-zinc-100 transition hover:border-blue-400/60 hover:text-blue-200"
          >
            Switch Account
          </Link>
        </div>

        <div className="mt-12 w-full max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur-xl">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-zinc-400">Signed In</p>
          <p className="text-sm text-zinc-200">{data?.user?.email}</p>
          <p className="mt-1 text-sm text-zinc-400">Role: {data?.user?.role}</p>
        </div>
      </section>
    </div>
  );
}
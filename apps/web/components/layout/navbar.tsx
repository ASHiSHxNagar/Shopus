"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="w-full flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-black text-white">

      {/* Left */}
      <Link href="/" className="text-lg font-semibold">
        Shopus
      </Link>

      {/* Right */}
      <div className="flex items-center gap-4">

        {!session && (
          <>
            <Link href="/auth/login" className="hover:text-blue-400">
              Login
            </Link>

            <Link href="/auth/register" className="hover:text-blue-400">
              Register
            </Link>
          </>
        )}

        {session && (
          <>
            <Link href="/dashboard" className="hover:text-blue-400">
              Dashboard
            </Link>

            <button
              onClick={() => signOut({ callbackUrl: "/auth/login" })}
              className="cursor-pointer text-red-400 hover:underline"
            >
              Logout
            </button>
          </>
        )}

      </div>
    </div>
  );
}
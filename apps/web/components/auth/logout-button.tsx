"use client";

import { signOut } from "next-auth/react";

export function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/auth/login" })}
      className="mt-6 px-4 py-2 bg-red-600 rounded cursor-pointer"
    >
      Logout
    </button>
  );
}
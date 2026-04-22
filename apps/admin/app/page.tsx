"use client";

import { useSession } from "next-auth/react";

export default function AdminHome() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;

  if (!session) {
    window.location.href = "/auth/login";
    return null;
  }

  if (session.user.role !== "ADMIN") {
    window.location.href = "/";
    return null;
  }

  return (
    <div className="text-white p-10">
      <h1 className="text-3xl font-bold">Admin Panel</h1>
      <p>Welcome {session.user.email}</p>
    </div>
  );
}
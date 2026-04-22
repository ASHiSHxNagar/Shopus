"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function AuthCallback() {
  const { data: session, status } = useSession();

  useEffect(() => {
    const run = async () => {
      if (status === "authenticated") {
        const role = localStorage.getItem("selectedRole") || "SELLER";

        // 🔥 API call to update role
        await fetch("/api/update-role", {
          method: "POST",
          body: JSON.stringify({ role }),
        });

        localStorage.removeItem("selectedRole");

        if (role === "ADMIN") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/dashboard";
        }
      }
    };

    run();
  }, [status]);

  return <div className="text-white">Setting up...</div>;
}
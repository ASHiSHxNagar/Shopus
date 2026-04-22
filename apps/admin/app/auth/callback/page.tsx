"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

type Role = "SELLER" | "ADMIN";

function getRoleRedirect(role: Role): string {
  return role === "SELLER" ? "http://localhost:3000/" : "/";
}

export default function AuthCallback() {
  const { status } = useSession();
  const searchParams = useSearchParams();

  useEffect(() => {
    const run = async () => {
      if (status === "authenticated") {
        const intendedRole =
          searchParams.get("intent") === "SELLER" ? "SELLER" : "ADMIN";

        const response = await fetch("/api/auth/google-bootstrap", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ intendedRole }),
        });

        if (!response.ok) {
          window.location.href = "/auth/login";
          return;
        }

        const result = (await response.json()) as { role?: Role };
        const role: Role = result.role === "SELLER" ? "SELLER" : "ADMIN";

        window.location.href = getRoleRedirect(role);
        return;
      }

      if (status === "unauthenticated") {
        window.location.href = "/auth/login";
      }
    };

    run();
  }, [searchParams, status]);

  return <div className="text-white p-8">Setting up...</div>;
}

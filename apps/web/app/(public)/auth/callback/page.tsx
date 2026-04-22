"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

type Role = "SELLER" | "ADMIN";

function getRoleRedirect(role: Role): string {
  return role === "ADMIN" ? "http://localhost:3001/" : "/";
}

export default function AuthCallback() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();

  useEffect(() => {
    const run = async () => {
      if (status === "authenticated") {
        const intendedRole =
          searchParams.get("intent") === "ADMIN" ? "ADMIN" : "SELLER";

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
        const resolvedRole: Role = result.role === "ADMIN" ? "ADMIN" : "SELLER";

        window.location.href = getRoleRedirect(resolvedRole);
        return;
      }

      if (status === "unauthenticated") {
        window.location.href = "/auth/login";
      }
    };

    run();
  }, [searchParams, session?.user?.email, status]);

  return <div className="text-white">Setting up...</div>;
}
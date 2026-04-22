import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      role: "SELLER" | "ADMIN";
      name?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    role: "SELLER" | "ADMIN";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: "SELLER" | "ADMIN";
  }
}

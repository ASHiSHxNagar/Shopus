import NextAuth, { type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { prisma } from "@repo/db/client";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
async authorize(credentials) {
  // 1️⃣ basic check
  if (!credentials?.email || !credentials?.password) {
    return null;
  }

  // 2️⃣ DB se user lao
  const user = await prisma.user.findUnique({
    where: {
      email: credentials.email,
    },
  });

  if (!user) {
    return null;
  }

  // 3️⃣ password compare
  const isValid = await bcrypt.compare(
    credentials.password,
    user.password
  );

  if (!isValid) {
    return null;
  }

  // 4️⃣ return user (VERY IMPORTANT)
  return {
    id: user.id,
    email: user.email,
  };
}
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
import { prisma } from "@repo/db/client";
import bcrypt from "bcryptjs";

type Role = "SELLER" | "ADMIN";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    role?: Role;
  };

  const { name, email, password, confirmPassword, role } = body;

  if (!email || !password || !confirmPassword) {
    return new Response("Missing fields", { status: 400 });
  }

  if (password !== confirmPassword) {
    return new Response("Passwords do not match", { status: 400 });
  }

  const finalRole: Role = role === "ADMIN" ? "ADMIN" : "SELLER";

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    if (existingUser.role !== finalRole) {
      return new Response(`ROLE_MISMATCH:${existingUser.role}`, { status: 409 });
    }
    return new Response("User already exists", { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: finalRole,
    },
  });

  return new Response("User created", { status: 201 });
}

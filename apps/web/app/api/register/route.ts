import { prisma } from "@repo/db/client";
import bcrypt from "bcryptjs";

type Role = "SELLER" | "ADMIN";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, password, confirmPassword, role } = body;

  // 1️⃣ basic validation
  if (!email || !password || !confirmPassword) {
    return new Response("Missing fields", { status: 400 });
  }

  // 2️⃣ confirm password check
  if (password !== confirmPassword) {
    return new Response("Passwords do not match", { status: 400 });
  }

  // 3️⃣ existing user check
  const requestedRole: Role = role === "ADMIN" ? "ADMIN" : "SELLER";

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    if (existingUser.role !== requestedRole) {
      return new Response(`ROLE_MISMATCH:${existingUser.role}`, { status: 409 });
    }
    return new Response("User already exists", { status: 409 });
  }

  if (role !== "SELLER" && role !== "ADMIN") {
    return new Response("Invalid role", { status: 400 });
  }

  // 4️⃣ hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 5️⃣ create user
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: requestedRole,
    },
  });

  return new Response("User created", { status: 200 });
}
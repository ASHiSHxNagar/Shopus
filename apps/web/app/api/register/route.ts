import { prisma } from "@repo/db/client";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, password, confirmPassword } = body;

  // 1️⃣ basic validation
  if (!email || !password || !confirmPassword) {
    return new Response("Missing fields", { status: 400 });
  }

  // 2️⃣ confirm password check
  if (password !== confirmPassword) {
    return new Response("Passwords do not match", { status: 400 });
  }

  // 3️⃣ existing user check
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return new Response("User already exists", { status: 400 });
  }

  // 4️⃣ hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 5️⃣ create user
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return new Response("User created", { status: 200 });
}
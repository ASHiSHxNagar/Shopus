import { prisma } from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

type Role = "SELLER" | "ADMIN";

function toRole(input: unknown): Role {
  return input === "ADMIN" ? "ADMIN" : "SELLER";
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as { intendedRole?: Role };
  const intendedRole = toRole(body.intendedRole);

  const existingUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (existingUser) {
    return Response.json({
      role: existingUser.role,
      userId: existingUser.id,
      source: "existing",
    });
  }

  const created = await prisma.user.create({
    data: {
      email: session.user.email,
      name: session.user.name ?? "",
      password: "",
      role: intendedRole,
    },
  });

  return Response.json({
    role: created.role,
    userId: created.id,
    source: "created",
  });
}

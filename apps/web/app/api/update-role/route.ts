import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@repo/db/client";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const { role } = await req.json();

  if (!session?.user?.email) {
    return new Response("Unauthorized", { status: 401 });
  }

  await prisma.user.update({
    where: { email: session.user.email },
    data: { role },
  });

  return new Response("ok");
}
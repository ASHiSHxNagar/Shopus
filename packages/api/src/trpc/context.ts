import { prisma } from "@repo/db/client";
import { getAuthSession } from "@repo/web/lib/auth";
export async function createTRPCContext() {
    const session = await getAuthSession();


  return {
    prisma,
    session,
  };
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
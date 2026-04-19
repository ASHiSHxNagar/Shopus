import { appRouter } from "../trpc/root";
import { createTRPCContext } from "../trpc/context";

async function main() {
  const ctx = await createTRPCContext();

  const caller = appRouter.createCaller(ctx);

  const users = await caller.user.getAll();

  console.log("Users from tRPC:", users);
}

main().catch(console.error);
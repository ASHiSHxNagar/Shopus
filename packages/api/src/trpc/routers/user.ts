import { router, publicProcedure } from "../init";

export const userRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.prisma.user.findMany();
    return users;
  }),
  getMe: publicProcedure.query(({ ctx }) => {
  return ctx.session;
}),
});
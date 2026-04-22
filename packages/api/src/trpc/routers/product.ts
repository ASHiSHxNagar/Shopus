import { router, publicProcedure } from "../init";
import { z } from "zod";

export const productRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        price: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.product.create({
        data: {
          name: input.name,
          price: input.price,
        },
      });
    }),
  
  update: publicProcedure
  .input(
    z.object({
      id: z.string(),
      name: z.string(),
      price: z.number(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    return await ctx.prisma.product.update({
      where: { id: input.id },
      data: {
        name: input.name,
        price: input.price,
      },
    });
  }),

  delete: publicProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    return await ctx.prisma.product.delete({
      where: { id: input.id },
    });
  }),
});
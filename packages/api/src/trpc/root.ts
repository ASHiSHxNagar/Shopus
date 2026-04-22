import { router } from "./init";
import { userRouter } from "./routers/user";
import { productRouter } from "./routers/product";

export const appRouter = router({
  user: userRouter,
   product: productRouter,
});

export type AppRouter = typeof appRouter;
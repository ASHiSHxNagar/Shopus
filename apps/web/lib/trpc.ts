"use client";

import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../../packages/api/src/trpc/root";

export const trpc = createTRPCReact<AppRouter>();
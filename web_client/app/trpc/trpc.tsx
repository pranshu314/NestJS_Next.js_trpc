import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "@server/trpc/trpc.router";
import * as dotenv from "dotenv";

dotenv.config();

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      // url: process.env.BACKEND_URL || "http://localhost:4000/v1",
      url: "https://nest-js-next-js-trpc-backend-60lb9vilj-pranshu314s-projects.vercel.app/v1",
    }),
  ],
});

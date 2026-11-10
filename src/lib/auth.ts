import { prisma } from "@/database/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";


export const auth = betterAuth({
  plugins: [nextCookies()],
  database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "sqlite", ...etc
        
    }),
    emailAndPassword: { 
    enabled: true, 
    autoSignIn: true,
  },
   
    
});
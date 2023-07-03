import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./prisma";
export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    async session({ session, user }) {
      console.log(`user: `, user);
      session.user.id = user.id;
      session.user.slug = user.slug;
      return session;
    },
  },
};

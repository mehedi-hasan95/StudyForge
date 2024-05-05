import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/prismaDb";
import authConfig from "@/auth.config";
import { getUserById } from "@/data/userInfo";
import { getUserAccountByUserId } from "./lib/account";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/signin",
    error: "/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // All provider can login except credentials
      if (account?.type !== "credentials") {
        return true;
      }

      // Prevent unverifide credentials user
      const existingUser = await getUserById(user.id);
      if (!existingUser?.emailVerified) {
        return false;
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      // Set User role
      if (session.user && token.role) {
        session.user.role = token.role;
        session.user.isOuth = token.isOuth as boolean;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.image = token.picture;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      const existingAccount = await getUserAccountByUserId(existingUser.id);
      token.isOuth = !!existingAccount;
      token.name = existingUser.name;
      token.picture = existingUser.image;
      token.role = existingUser.role;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 3 },
  ...authConfig,
});

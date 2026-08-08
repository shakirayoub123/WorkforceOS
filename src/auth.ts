import NextAuth, { type DefaultSession } from "next-auth";
import { getServerSession } from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { normalizeEmail, verifyPassword } from "@/lib/auth/password";
import { ACCOUNT_STATUS, USER_ROLES, type UserRole } from "@/config/constants";

const credentialsSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: UserRole;
      companyId: string | null;
      status: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: UserRole;
    companyId: string | null;
    status: string;
  }
}

const authConfig = {
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt" as const,
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) {
          return null;
        }

        const { prisma } = await import("@/lib/db/prisma");
        const normalizedEmail = normalizeEmail(parsed.data.email);
        const user = await prisma.user.findUnique({
          where: { email: normalizedEmail },
          select: {
            id: true,
            name: true,
            email: true,
            passwordHash: true,
            role: true,
            companyId: true,
            status: true,
          },
        });

        if (!user) {
          return null;
        }

        if (user.status === ACCOUNT_STATUS.INACTIVE) {
          throw new Error("inactive");
        }

        if (user.status === ACCOUNT_STATUS.SUSPENDED) {
          throw new Error("suspended");
        }

        const passwordMatches = await verifyPassword(parsed.data.password, user.passwordHash);
        if (!passwordMatches) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role as UserRole,
          companyId: user.companyId,
          status: user.status,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.role = user.role;
        token.companyId = user.companyId;
        token.status = user.status;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.role = (token.role as UserRole) ?? USER_ROLES.WORKER;
        session.user.companyId = (token.companyId as string | null) ?? null;
        session.user.status = (token.status as string) ?? ACCOUNT_STATUS.ACTIVE;
      }
      return session;
    },
  },
};

const nextAuthHandler = NextAuth(authConfig);

export async function auth() {
  const session = await getServerSession(authConfig);
  return session;
}

export const GET = nextAuthHandler;
export const POST = nextAuthHandler;
export const authConfigExport = authConfig;

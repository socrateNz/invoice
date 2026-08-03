import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = (credentials.email as string).trim().toLowerCase();
        const password = (credentials.password as string).trim();

        console.log("[AUTH_DEBUG] Authorizing email:", email);

        const user = await prisma.user.findUnique({
          where: { email },
          include: {
            memberships: {
              include: { organization: true },
              take: 1,
            },
          },
        });

        if (!user) {
          console.log("[AUTH_DEBUG] User not found for email:", email);
          return null;
        }

        const isValid = await bcrypt.compare(
          password,
          user.password
        );

        if (!isValid) {
          console.log("[AUTH_DEBUG] Invalid password for user:", email);
          return null;
        }

        console.log("[AUTH_DEBUG] Authentication successful for user:", email);

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          organizationId: user.memberships[0]?.organizationId ?? null,
          role: user.memberships[0]?.role ?? null,
          systemRole: user.systemRole,
        };
      },
    }),
  ],
});

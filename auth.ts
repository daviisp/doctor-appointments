import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const clinic = await prisma.clinic.findUnique({
          where: { email: credentials.email as string },
        });

        if (!clinic) return null;

        const passwordMatch = await compare(
          credentials.password as string,
          clinic.password,
        );

        if (!passwordMatch) return null;

        return {
          id: clinic.id,
          name: clinic.name,
          email: clinic.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});

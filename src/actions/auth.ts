"use server";

import { signIn } from "@/auth";
import { AuthSchema } from "@/schemas/auth-schema";
import { AuthError } from "next-auth";

export async function authAction(data: AuthSchema) {
  try {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "E-mail ou senha inválidos." };
    }
    throw error;
  }
}

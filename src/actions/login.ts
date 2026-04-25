"use server";

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas/login-schema";
import { AuthError } from "next-auth";

export async function loginAction(data: LoginSchema) {
  try {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirectTo: "/painel",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "E-mail ou senha inválidos." };
    }
    throw error;
  }
}

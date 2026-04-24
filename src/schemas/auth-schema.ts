import z from "zod";

export const authSchema = z.object({
  email: z
    .string()
    .min(1, "E-mail é obrigatório")
    .pipe(z.email("E-mail inválido")),
  password: z.string().min(1, "Senha é obrigatória"),
});

export type AuthSchema = z.infer<typeof authSchema>;

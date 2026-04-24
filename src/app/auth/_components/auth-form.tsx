"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema, AuthSchema } from "@/schemas/auth-schema";
import { authAction } from "@/actions/auth";
import {
  Eye,
  EyeOff,
  Heart,
  Clock,
  Lock,
  Mail,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

export const AuthForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: AuthSchema) => {
    const result = await authAction(data);
    if (result?.error) {
      toast.error(result.error);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <div className="hidden lg:flex flex-1 bg-linear-to-br from-blue-600 to-blue-800 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10 max-w-md text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-3xl mb-6">
            <Stethoscope className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Bem-vindo ao Portal da Clínica
          </h2>
          <p className="text-blue-100 text-lg mb-10">
            Gerencie consultas, prontuários e muito mais em um único lugar.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-white">Dados Seguros</h3>
                <p className="text-sm text-blue-100">
                  Criptografia de ponta a ponta
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-white">Acesso 24/7</h3>
                <p className="text-sm text-blue-100">
                  Disponível a qualquer momento
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-white">
                  Atendimento Humanizado
                </h3>
                <p className="text-sm text-blue-100">
                  Cuidado com cada paciente
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Clínica Cemi</h1>
            <p className="text-slate-500 mt-1">Acesse sua conta</p>
          </div>
          <Card className="shadow-lg shadow-slate-200/50 border-0">
            <CardHeader className="pb-0">
              <CardTitle className="text-lg">Entrar</CardTitle>
              <CardDescription>
                Digite suas credenciais para acessar o sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="email">E-mail</FieldLabel>
                    <InputGroup>
                      <InputGroupAddon>
                        <Mail className="w-4 h-4 text-slate-400" />
                      </InputGroupAddon>
                      <InputGroupInput
                        id="email"
                        type="email"
                        placeholder="Digite seu e-mail"
                        {...form.register("email")}
                      />
                    </InputGroup>
                    {form.formState.errors.email && (
                      <p className="text-sm text-red-500 mt-1">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="password">Senha</FieldLabel>
                    <InputGroup>
                      <InputGroupAddon>
                        <Lock className="w-4 h-4 text-slate-400" />
                      </InputGroupAddon>
                      <InputGroupInput
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Digite sua senha"
                        {...form.register("password")}
                      />
                      <InputGroupButton
                        type="button"
                        size="icon-sm"
                        className="cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5 text-slate-400" />
                        ) : (
                          <Eye className="w-5 h-5 text-slate-400" />
                        )}
                      </InputGroupButton>
                    </InputGroup>
                    {form.formState.errors.password && (
                      <p className="text-sm text-red-500 mt-1">
                        {form.formState.errors.password.message}
                      </p>
                    )}
                  </Field>
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 hover:cursor-pointer"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? (
                      <>
                        <Spinner className="mr-2" />
                        Entrando...
                      </>
                    ) : (
                      "Entrar"
                    )}
                  </Button>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

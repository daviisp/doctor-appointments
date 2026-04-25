import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { LoginForm } from "./_components/login-form";

const LoginPage = async () => {
  const session = await auth();

  if (session?.user) {
    redirect("/painel");
  }

  return <LoginForm />;
};

export default LoginPage;

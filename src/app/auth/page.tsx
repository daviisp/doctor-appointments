import { auth } from "@/auth";
import { AuthForm } from "./_components/auth-form";
import { redirect } from "next/navigation";

const AuthPage = async () => {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return <AuthForm />;
};

export default AuthPage;

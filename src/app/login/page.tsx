import { Metadata } from "next";
import { LoginForm } from "./_components/login-form";

export const metadata: Metadata = {
  title: "Clínica Cemi - Login",
};

const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;

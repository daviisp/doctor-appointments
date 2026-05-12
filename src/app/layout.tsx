import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { Sidebar } from "./_components/sidebar";
import { auth } from "@/auth";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-primary",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-fallback",
});

export const metadata: Metadata = {
  title: "Clínica Cemi",
  description: "Sistema de Agendamentos - Clínica Cemi",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html
      lang="pt-BR"
      className={cn(
        "h-full",
        "antialiased",
        "font-sans",
        manrope.variable,
        inter.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        {session?.user && <Sidebar />}
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}

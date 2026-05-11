import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhone(phone?: string): string {
  if (!phone) return "Não informado";

  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.length === 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
  }

  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  }

  return phone;
}

export const formatCpf = (cpf?: string): string => {
  if (!cpf) return "Não informado";

  const cleaned = cpf?.replace(/\D/g, "");

  return `***.${cleaned?.slice(3, 6)}.${cleaned?.slice(6, 9)}-**`;
};

export const normalizeTime = (value: string): string => {
  const cleaned = value.replace(/[^0-9:]/g, "");

  if (!cleaned.includes(":")) {
    const num = parseInt(cleaned);
    if (isNaN(num)) return "";
    const hours = Math.min(num, 23);
    return `${hours.toString().padStart(2, "0")}:00`;
  }

  const [h, m] = cleaned.split(":");
  const hours = Math.min(parseInt(h) || 0, 23);
  const minutes = Math.min(parseInt(m) || 0, 59);

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
};

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

export const formatCpfInput = (value: string): string => {
  const cleaned = value.replace(/\D/g, "").slice(0, 11);
  if (cleaned.length <= 3) return cleaned;
  if (cleaned.length <= 6) return `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
  if (cleaned.length <= 9)
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`;
  return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9)}`;
};

export const formatPhoneInput = (value: string): string => {
  const cleaned = value.replace(/\D/g, "").slice(0, 11);
  if (cleaned.length <= 2) return `(${cleaned}`;
  if (cleaned.length <= 7)
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
  if (cleaned.length <= 10)
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
};

export const validateCpf = (cpf: string): boolean => {
  const cleaned = cpf.replace(/\D/g, "");
  if (cleaned.length !== 11) return false;
  if (/^(\d)\1+$/.test(cleaned)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(cleaned[i]) * (10 - i);
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleaned[9])) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(cleaned[i]) * (11 - i);
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleaned[10])) return false;

  return true;
};

export const formatCurrency = (value: string): string => {
  const cleaned = value.replace(/\D/g, "");
  if (!cleaned) return "";
  const number = parseInt(cleaned) / 100;
  return number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

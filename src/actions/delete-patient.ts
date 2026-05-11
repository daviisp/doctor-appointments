"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deletePatient = async (id: string) => {
  try {
    await prisma.patient.delete({ where: { id } });
    revalidatePath("/pacientes");
    return { success: true };
  } catch {
    return { error: "Erro ao excluir paciente." };
  }
};

"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteDoctor = async (id: string) => {
  try {
    await prisma.doctor.delete({
      where: { id },
    });

    revalidatePath("/medicos");
    return { success: true };
  } catch {
    return { error: "Erro ao excluir médico." };
  }
};

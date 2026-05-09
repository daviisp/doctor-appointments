"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteAppointment = async (id: string) => {
  try {
    await prisma.appointment.delete({
      where: { id },
    });

    revalidatePath("/agendamentos");
    return { success: true };
  } catch {
    return { error: "Erro ao excluir agendamento." };
  }
};

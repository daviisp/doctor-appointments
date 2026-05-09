"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface UpdateAppointmentData {
  id: string;
  patientId: string;
  doctorId: string;
  date: Date;
}

export const updateAppointment = async (data: UpdateAppointmentData) => {
  try {
    const existing = await prisma.appointment.findFirst({
      where: {
        doctorId: data.doctorId,
        date: data.date,
        NOT: { id: data.id },
      },
    });

    if (existing) {
      return { error: "Esse horário já está ocupado." };
    }

    await prisma.appointment.update({
      where: { id: data.id },
      data: {
        patientId: data.patientId,
        doctorId: data.doctorId,
        date: data.date,
      },
    });

    revalidatePath("/agendamentos");
    return { success: true };
  } catch {
    return { error: "Erro ao atualizar agendamento." };
  }
};

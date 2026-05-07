"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface CreateAppointmentData {
  patientId: string;
  doctorId: string;
  date: Date;
}

export const createAppointment = async (data: CreateAppointmentData) => {
  const existing = await prisma.appointment.findFirst({
    where: {
      doctorId: data.doctorId,
      date: data.date,
    },
  });

  if (existing) {
    return { error: "Esse horário já está ocupado." };
  }

  await prisma.appointment.create({
    data: {
      patientId: data.patientId,
      doctorId: data.doctorId,
      date: data.date,
    },
  });

  revalidatePath("/agendamentos");
  return { success: true };
};

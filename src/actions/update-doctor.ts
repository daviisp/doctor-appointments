"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface UpdateDoctorData {
  id: string;
  name: string;
  specialtyId: string;
  appointmentPrice: number;
  availabilities: {
    weekDay: number;
    startTime: string;
    endTime: string;
  }[];
}

export const updateDoctor = async (data: UpdateDoctorData) => {
  try {
    const newWeekDays = data.availabilities.map((a) => a.weekDay);

    const futureAppointments = await prisma.appointment.findMany({
      where: {
        doctorId: data.id,
        date: { gte: new Date() },
      },
    });

    const appointmentsToDelete = futureAppointments.filter((appointment) => {
      const weekDay = appointment.date.getDay();
      return !newWeekDays.includes(weekDay);
    });

    await prisma.doctor.update({
      where: { id: data.id },
      data: {
        name: data.name,
        specialtyId: data.specialtyId,
        appointmentPrice: data.appointmentPrice,
        availabilities: {
          deleteMany: {},
          create: data.availabilities,
        },
      },
    });

    if (appointmentsToDelete.length > 0) {
      await prisma.appointment.deleteMany({
        where: {
          id: { in: appointmentsToDelete.map((a) => a.id) },
        },
      });
    }

    revalidatePath("/medicos");
    revalidatePath("/agendamentos");
    return { success: true };
  } catch {
    return { error: "Erro ao atualizar médico." };
  }
};

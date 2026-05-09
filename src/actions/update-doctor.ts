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

    revalidatePath("/medicos");
    return { success: true };
  } catch {
    return { error: "Erro ao atualizar médico." };
  }
};

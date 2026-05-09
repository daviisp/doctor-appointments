"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface CreateDoctorData {
  name: string;
  specialtyId: string;
  appointmentPrice: number;
  availabilities: {
    weekDay: number;
    startTime: string;
    endTime: string;
  }[];
}

export const createDoctor = async (data: CreateDoctorData) => {
  try {
    await prisma.doctor.create({
      data: {
        name: data.name,
        specialtyId: data.specialtyId,
        appointmentPrice: data.appointmentPrice,
        availabilities: {
          create: data.availabilities,
        },
      },
    });

    revalidatePath("/medicos");
    return { success: true };
  } catch {
    return { error: "Erro ao cadastrar médico." };
  }
};

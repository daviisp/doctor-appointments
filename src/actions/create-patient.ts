"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface CreatePatientData {
  name: string;
  phone: string | null;
  cpf: string | null;
  sex: "MALE" | "FEMALE";
  dateOfBirth: Date | null;
}

export const createPatient = async (data: CreatePatientData) => {
  try {
    await prisma.patient.create({
      data: {
        name: data.name,
        phone: data.phone,
        cpf: data.cpf,
        sex: data.sex,
        dateOfBirth: data.dateOfBirth,
      },
    });

    revalidatePath("/pacientes");
    return { success: true };
  } catch {
    return { error: "Erro ao cadastrar paciente." };
  }
};

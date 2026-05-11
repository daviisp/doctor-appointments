"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface UpdatePatientData {
  id: string;
  name: string;
  phone: string | null;
  cpf: string | null;
  sex: "MALE" | "FEMALE";
  dateOfBirth: Date | null;
}

export const updatePatient = async (data: UpdatePatientData) => {
  try {
    await prisma.patient.update({
      where: { id: data.id },
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
    return { error: "Erro ao atualizar paciente." };
  }
};

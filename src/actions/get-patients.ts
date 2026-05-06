"use server";

import { prisma } from "@/lib/prisma";
import { Patient } from "@/types/patient";

export const getPatients = async (): Promise<Patient[]> => {
  return prisma.patient.findMany({
    orderBy: {
      name: "asc",
    },
  });
};

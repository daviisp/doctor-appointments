"use server";

import { prisma } from "@/lib/prisma";

export const getTotalPatients = async (): Promise<number> => {
  return prisma.patient.count();
};

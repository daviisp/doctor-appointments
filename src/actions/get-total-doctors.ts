"use server";

import { prisma } from "@/lib/prisma";

export const getTotalDoctors = async (): Promise<number> => {
  return prisma.doctor.count();
};

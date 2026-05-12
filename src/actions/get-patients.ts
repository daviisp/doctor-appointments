"use server";

import { prisma } from "@/lib/prisma";

export const getPatients = async () => {
  return prisma.patient.findMany({
    orderBy: {
      name: "asc",
    },
  });
};

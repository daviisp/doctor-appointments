"use server";

import { prisma } from "@/lib/prisma";

export const getPatientsForSelect = async () => {
  return prisma.patient.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: { name: "asc" },
  });
};

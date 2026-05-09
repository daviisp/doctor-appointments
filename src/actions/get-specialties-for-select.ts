"use server";

import { prisma } from "@/lib/prisma";

export const getSpecialtiesForSelect = async () => {
  return prisma.specialty.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: { name: "asc" },
  });
};

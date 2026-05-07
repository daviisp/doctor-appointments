"use server";

import { prisma } from "@/lib/prisma";

export const getDoctorsForSelect = async () => {
  return prisma.doctor.findMany({
    select: {
      id: true,
      name: true,
      specialty: {
        select: { name: true },
      },
      availabilities: {
        select: {
          weekDay: true,
          startTime: true,
          endTime: true,
        },
      },
    },
    orderBy: { name: "asc" },
  });
};

"use server";

import { prisma } from "@/lib/prisma";
import { Doctor } from "@/types/doctor";

export const getDoctors = async (): Promise<Doctor[]> => {
  return prisma.doctor.findMany({
    include: {
      specialty: {
        select: {
          id: true,
          name: true,
        },
      },
      availabilities: {
        select: {
          weekDay: true,
          startTime: true,
          endTime: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });
};

"use server";

import { prisma } from "@/lib/prisma";

export const getTotalAppointmentsOnMonth = async (): Promise<number> => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
  );

  return prisma.appointment.count({
    where: {
      date: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
    },
  });
};

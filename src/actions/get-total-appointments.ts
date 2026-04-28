"use server";

import { prisma } from "@/lib/prisma";

export const getTotalAppointments = async (): Promise<number> => {
  return prisma.appointment.count();
};

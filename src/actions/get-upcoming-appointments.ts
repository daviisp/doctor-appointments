"use server";

import { prisma } from "@/lib/prisma";
import { AppointmentWithRelations } from "@/types/appointment-with-relations";

export const getUpcomingAppointments = async (): Promise<
  AppointmentWithRelations[]
> => {
  const now = new Date();

  return prisma.appointment.findMany({
    where: { date: { gte: now } },
    include: {
      patient: { select: { name: true } },
      doctor: {
        select: {
          name: true,
          appointmentPrice: true,
          specialty: { select: { name: true } },
        },
      },
    },
    orderBy: { date: "asc" },
  });
};

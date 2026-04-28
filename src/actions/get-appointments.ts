"use server";

import { prisma } from "@/lib/prisma";
import { AppointmentWithRelations } from "@/types/appointment-with-relations";

export const getAppointments = async (): Promise<
  AppointmentWithRelations[]
> => {
  const appointments = await prisma.appointment.findMany({
    include: {
      patient: {
        select: {
          name: true,
        },
      },
      doctor: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
    take: 10,
  });

  return appointments;
};

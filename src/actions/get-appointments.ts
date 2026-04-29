"use server";

import { prisma } from "@/lib/prisma";
import { Appointment } from "@/types/appointment";

export const getAppointments = async (): Promise<Appointment[]> => {
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

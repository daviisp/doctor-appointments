"use server";

import { prisma } from "@/lib/prisma";

export const getAppointmentsChartOnWeek = async () => {
  const now = new Date();
  const dayOfWeek = now.getDay();

  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1));
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 4);
  endOfWeek.setHours(23, 59, 59, 999);

  const appointments = await prisma.appointment.findMany({
    where: {
      date: {
        gte: startOfWeek,
        lte: endOfWeek,
      },
    },
  });

  const days = ["Seg", "Ter", "Qua", "Qui", "Sex"];

  return days.map((day, index) => {
    const dayIndex = index + 1;

    const total = appointments.filter(
      (appointment) => new Date(appointment.date).getDay() === dayIndex,
    ).length;

    return { day, total };
  });
};

"use server";

import { prisma } from "@/lib/prisma";
import { ChartData } from "@/types/chart-data";

export const getPatientsChartData = async (): Promise<ChartData[]> => {
  const appointments = await prisma.appointment.findMany();

  const days = ["Seg", "Ter", "Qua", "Qui", "Sex"];

  const chartData = days.map((day, index) => {
    const dayIndex = index + 1;

    const total = appointments.filter(
      (appointment) => new Date(appointment.date).getDay() === dayIndex,
    ).length;

    return {
      day,
      total,
    };
  });

  return chartData;
};

"use server";

import { prisma } from "@/lib/prisma";

export const getAvailableSlots = async (
  doctorId: string,
  date: Date,
): Promise<string[]> => {
  const weekDay = date.getDay();

  const availability = await prisma.doctorAvailability.findFirst({
    where: { doctorId, weekDay },
  });

  if (!availability) return [];

  const appointments = await prisma.appointment.findMany({
    where: {
      doctorId,
      date: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lte: new Date(date.setHours(23, 59, 59, 999)),
      },
    },
  });

  const bookedTimes = appointments.map((a) => {
    const date = new Date(a.date);
    const brasiliaDate = new Date(date.getTime() - 3 * 60 * 60 * 1000);
    return `${brasiliaDate.getUTCHours().toString().padStart(2, "0")}:${brasiliaDate.getUTCMinutes().toString().padStart(2, "0")}`;
  });

  const slots: string[] = [];
  const [startHour, startMinute] = availability.startTime
    .split(":")
    .map(Number);
  const [endHour, endMinute] = availability.endTime.split(":").map(Number);

  let current = startHour * 60 + startMinute;
  const end = endHour * 60 + endMinute;

  while (current < end) {
    const h = Math.floor(current / 60)
      .toString()
      .padStart(2, "0");
    const m = (current % 60).toString().padStart(2, "0");
    const slot = `${h}:${m}`;

    if (!bookedTimes.includes(slot)) {
      slots.push(slot);
    }

    current += 30;
  }

  return slots;
};

"use server";

import { prisma } from "@/lib/prisma";
import { SpecialtyWithUpcomingAppointments } from "@/types/specialties-with-upcoming-appointments";

export const getSpecialtiesWithUpcomingAppointments = async (): Promise<
  SpecialtyWithUpcomingAppointments[]
> => {
  const now = new Date();

  const specialties = await prisma.specialty.findMany({
    include: {
      doctors: {
        include: {
          _count: {
            select: {
              appointments: {
                where: {
                  date: {
                    gte: now,
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  const result = specialties.map((specialty) => ({
    id: specialty.id,
    name: specialty.name,
    appointments: specialty.doctors.reduce(
      (acc, doctor) => acc + doctor._count.appointments,
      0,
    ),
  }));

  const sorted = result
    .sort((a, b) => b.appointments - a.appointments)
    .slice(0, 5);
  const max = sorted[0]?.appointments ?? 1;

  return sorted.map((specialty) => ({
    ...specialty,
    progress: Math.round((specialty.appointments / max) * 100),
  }));
};

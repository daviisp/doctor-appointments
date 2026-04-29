"use server";

import { prisma } from "@/lib/prisma";
import { DoctorWithUpcomingAppointments } from "@/types/doctor-with-upcoming-appointments";

export const getDoctorsWithUpcomingAppointments = async (): Promise<
  DoctorWithUpcomingAppointments[]
> => {
  const now = new Date();

  const doctors = await prisma.doctor.findMany({
    include: {
      specialty: true,
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
    orderBy: {
      appointments: {
        _count: "desc",
      },
    },
    take: 4,
  });

  return doctors.map((doctor) => ({
    id: doctor.id,
    name: doctor.name,
    specialty: doctor.specialty.name,
    avatarUrl: doctor.avatarUrl,
    appointments: doctor._count.appointments,
  }));
};

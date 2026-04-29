"use server";

import { prisma } from "@/lib/prisma";
import { DoctorWithAppointmentCount } from "@/types/doctor-with-appointment-count";

export const getDoctorsWithUpcomingAppointments = async (): Promise<
  DoctorWithAppointmentCount[]
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

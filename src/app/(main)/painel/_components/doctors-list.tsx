import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Stethoscope } from "lucide-react";
import Link from "next/link";
import { DoctorWithAppointmentCount } from "@/types/doctor-with-appointment-count";
import { getDoctorsWithUpcomingAppointments } from "@/actions/get-doctors-with-upcoming-appointments-count";

export const DoctorsList = async () => {
  const doctors = await getDoctorsWithUpcomingAppointments();

  return (
    <Card className="border border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <Stethoscope className="h-4 w-4 text-[#1a56db]" />
            Médicos
          </CardTitle>
          <Link
            href="/medicos"
            className="text-xs text-[#1a56db] hover:underline"
          >
            Ver todos
          </Link>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {doctors.map((doctor: DoctorWithAppointmentCount) => (
            <div key={doctor.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={doctor.avatarUrl ?? ""} alt={doctor.name} />
                  <AvatarFallback className="bg-muted text-xs">
                    {doctor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{doctor.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {doctor.specialty}
                  </p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">
                {doctor.appointments} agend.
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

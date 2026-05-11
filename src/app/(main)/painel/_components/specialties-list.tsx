import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSpecialtiesWithUpcomingAppointments } from "@/actions/get-specialties-with-upcoming-appointments";
import { SpecialtyWithUpcomingAppointments } from "@/types/specialties-with-upcoming-appointments";
import { HospitalIcon } from "lucide-react";

export const SpecialtiesList = async () => {
  const specialties = await getSpecialtiesWithUpcomingAppointments();

  return (
    <Card className="border border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <HospitalIcon className="h-4 w-4 text-[#1a56db]" />
            Especialidades
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {specialties.map((specialty: SpecialtyWithUpcomingAppointments) => (
            <div key={specialty.id} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{specialty.name}</span>
                <span className="text-xs text-muted-foreground">
                  {specialty.appointments} agend.
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-muted">
                <div
                  className="h-1.5 rounded-full bg-[#1a56db]"
                  style={{ width: `${specialty.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

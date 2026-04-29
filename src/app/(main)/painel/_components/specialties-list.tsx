import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { getSpecialtiesWithUpcomingAppointmentCount } from "@/actions/get-specialties-with-upcoming-appointment-count";
import { SpecialtyWithAppointmentCount } from "@/types/specialty-with-appointment-count";

export const SpecialtiesList = async () => {
  const specialties = await getSpecialtiesWithUpcomingAppointmentCount();

  return (
    <Card className="border border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">
            Especialidades
          </CardTitle>
          <Link
            href="/especialidades"
            className="text-xs text-[#1a56db] hover:underline"
          >
            Ver todos
          </Link>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {specialties.map((specialty: SpecialtyWithAppointmentCount) => (
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

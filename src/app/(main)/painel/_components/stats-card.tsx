import { Calendar, Users, Stethoscope } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getTotalPatients } from "@/actions/get-total-patients";
import { getTotalDoctors } from "@/actions/get-total-doctors";
import { getTotalAppointmentsOnMonth } from "@/actions/get-total-appointments-on-month";

export const StatsCards = async () => {
  const [totalAppointments, totalPatients, totalDoctors] = await Promise.all([
    getTotalAppointmentsOnMonth(),
    getTotalPatients(),
    getTotalDoctors(),
  ]);

  return (
    <div className="grid gap-8 grid-cols-3">
      <Card className="border border-border py-0">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs md:text-sm text-muted-foreground">
                Agendamentos nesse mês
              </p>
              <p className="text-xl font-bold">{totalAppointments}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="border border-border py-0">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
              <Users className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-xs md:text-sm text-muted-foreground">
                Pacientes
              </p>
              <p className="text-xl font-bold">{totalPatients}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="border border-border py-0">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
              <Stethoscope className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs md:text-sm text-muted-foreground">
                Médicos
              </p>
              <p className="text-xl font-bold">{totalDoctors}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

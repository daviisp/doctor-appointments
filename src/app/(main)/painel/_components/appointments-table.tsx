import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { StatusBadge } from "@/app/_components/status-badge";
import { getUpcomingAppointments } from "@/actions/get-upcoming-appointments";
import { AppointmentWithRelations } from "@/types/appointment-with-relations";

interface AppointmentsTableProps {
  status: "Confirmado" | "Finalizado";
}

export const AppointmentsTable = async ({ status }: AppointmentsTableProps) => {
  const appointments = await getUpcomingAppointments();

  return (
    <Card className="border border-border">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <Calendar className="h-4 w-4 text-[#1a56db]" />
          Próximos agendamentos
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs font-medium uppercase">
                  Paciente
                </TableHead>
                <TableHead className="text-xs font-medium uppercase">
                  Data
                </TableHead>
                <TableHead className="text-xs font-medium uppercase">
                  Doutor
                </TableHead>
                <TableHead className="text-xs font-medium uppercase">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment: AppointmentWithRelations) => (
                <TableRow
                  key={appointment.id}
                  className="text-foreground font-medium hover:bg-muted/50"
                >
                  <TableCell className="font-medium text-sm">
                    {appointment.patient.name}
                  </TableCell>
                  <TableCell className="text-sm">
                    {format(new Date(appointment.date), "dd/MM/yy, HH:mm", {
                      locale: ptBR,
                    })}
                  </TableCell>
                  <TableCell className="text-sm">
                    {appointment.doctor.name}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex flex-col gap-3 md:hidden">
          {appointments.map((appointment: AppointmentWithRelations) => (
            <div
              key={appointment.id}
              className="rounded-lg border border-border p-4 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">
                  {appointment.patient.name}
                </span>
                <StatusBadge status={status} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs">
                  📅{" "}
                  {format(new Date(appointment.date), "dd/MM/yy, HH:mm", {
                    locale: ptBR,
                  })}
                </span>
                <span className="text-xs">👨‍⚕️ {appointment.doctor.name}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

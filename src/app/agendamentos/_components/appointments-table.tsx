import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { AppointmentWithRelations } from "@/types/appointment-with-relations";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { StatusBadge } from "@/app/_components/status-badge";

interface AppointmentsTableProps {
  appointments: AppointmentWithRelations[];
  status: "Confirmado" | "Finalizado";
}

export const AppointmentsTable = ({
  appointments,
  status,
}: AppointmentsTableProps) => {
  return (
    <div className="hidden md:block rounded-lg border border-border bg-card overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-xs font-semibold uppercase text-muted-foreground">
              Paciente
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase text-muted-foreground">
              Data
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase text-muted-foreground">
              Médico
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase text-muted-foreground">
              Especialidade
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase text-muted-foreground">
              Valor
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase text-muted-foreground">
              Status
            </TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell className="font-medium text-foreground">
                {appointment.patient.name}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {format(new Date(appointment.date), "dd/MM/yy, HH:mm", {
                  locale: ptBR,
                })}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {appointment.doctor.name}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {appointment.doctor.specialty.name}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {(appointment.doctor.appointmentPrice / 100).toLocaleString(
                  "pt-BR",
                  {
                    style: "currency",
                    currency: "BRL",
                  },
                )}
              </TableCell>
              <TableCell>
                <StatusBadge status={status} />
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

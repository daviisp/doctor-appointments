import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

const appointments = [
  {
    paciente: "Ana Souza",
    data: "02/05/25, 09:00",
    doutor: "Dr. Lucas Moreira",
    status: "Confirmado",
  },
  {
    paciente: "João Martins",
    data: "03/05/25, 14:30",
    doutor: "Dr. Lucas Moreira",
    status: "Confirmado",
  },
  {
    paciente: "Camila Borges",
    data: "04/05/25, 11:15",
    doutor: "Dr. Rafael Santos",
    status: "Confirmado",
  },
  {
    paciente: "Lucas Fernandes",
    data: "05/05/25, 16:45",
    doutor: "Dr. Camila Ferreira",
    status: "Confirmado",
  },
  {
    paciente: "Beatriz Costa",
    data: "06/05/25, 08:00",
    doutor: "Dr. Bruno de Oliveira",
    status: "Confirmado",
  },
];

const StatusBadge = () => (
  <Badge
    variant="outline"
    className="border-emerald-200 bg-emerald-50 text-emerald-700 font-normal"
  >
    <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block" />
    Confirmado
  </Badge>
);

export const AppointmentsTable = () => {
  return (
    <Card className="border border-border">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <Calendar className="h-4 w-4 text-[#1a56db]" />
          Agendamentos
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {/* Tabela - visível apenas no desktop */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs font-medium text-muted-foreground uppercase">
                  Paciente
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground uppercase">
                  Data
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground uppercase">
                  Doutor
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground uppercase">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment, index) => (
                <TableRow key={index} className="hover:bg-muted/50">
                  <TableCell className="font-medium text-sm">
                    {appointment.paciente}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {appointment.data}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {appointment.doutor}
                  </TableCell>
                  <TableCell>
                    <StatusBadge />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex flex-col gap-3 md:hidden">
          {appointments.map((appointment, index) => (
            <div
              key={index}
              className="rounded-lg border border-border p-4 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">
                  {appointment.paciente}
                </span>
                <StatusBadge />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">
                  📅 {appointment.data}
                </span>
                <span className="text-xs text-muted-foreground">
                  👨‍⚕️ {appointment.doutor}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

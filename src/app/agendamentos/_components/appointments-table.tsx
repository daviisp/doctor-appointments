"use client";

import { ExternalLink } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Appointment {
  id: string;
  paciente: string;
  data: string;
  medico: string;
  especialidade: string;
  valor: string;
  status: "Confirmado" | "Pendente" | "Cancelado";
}

const appointments: Appointment[] = [
  {
    id: "1",
    paciente: "Ana Souza",
    data: "02/05/25, 09:00",
    medico: "Dr. Lucas Moreira",
    especialidade: "Cardiologia",
    valor: "R$ 200,00",
    status: "Confirmado",
  },
  {
    id: "2",
    paciente: "João Martins",
    data: "03/05/25, 14:30",
    medico: "Dr. Lucas Moreira",
    especialidade: "Cardiologia",
    valor: "R$ 200,00",
    status: "Confirmado",
  },
  {
    id: "3",
    paciente: "Camila Borges",
    data: "04/05/25, 11:15",
    medico: "Dr. Rafael Santos",
    especialidade: "Pediatria",
    valor: "R$ 200,00",
    status: "Confirmado",
  },
  {
    id: "4",
    paciente: "Lucas Fernandes",
    data: "05/05/25, 16:45",
    medico: "Dr. Camila Ferreira",
    especialidade: "Ginecologia",
    valor: "R$ 200,00",
    status: "Confirmado",
  },
  {
    id: "5",
    paciente: "Beatriz Costa",
    data: "06/05/25, 08:00",
    medico: "Dr. Bruno de Oliveira",
    especialidade: "Ortopedia",
    valor: "R$ 200,00",
    status: "Confirmado",
  },
  {
    id: "6",
    paciente: "Ana Souza",
    data: "04/05/25, 09:00",
    medico: "Dr. Lucas Moreira",
    especialidade: "Cardiologia",
    valor: "R$ 200,00",
    status: "Confirmado",
  },
  {
    id: "7",
    paciente: "João Martins",
    data: "04/05/25, 14:30",
    medico: "Dr. Lucas Moreira",
    especialidade: "Cardiologia",
    valor: "R$ 200,00",
    status: "Confirmado",
  },
  {
    id: "8",
    paciente: "Camila Borges",
    data: "04/05/25, 11:15",
    medico: "Dr. Rafael Santos",
    especialidade: "Pediatria",
    valor: "R$ 200,00",
    status: "Confirmado",
  },
  {
    id: "9",
    paciente: "Lucas Fernandes",
    data: "05/05/25, 16:45",
    medico: "Dr. Camila Ferreira",
    especialidade: "Ginecologia",
    valor: "R$ 200,00",
    status: "Confirmado",
  },
  {
    id: "10",
    paciente: "Beatriz Costa",
    data: "06/05/25, 08:00",
    medico: "Dr. Bruno de Oliveira",
    especialidade: "Ortopedia",
    valor: "R$ 200,00",
    status: "Confirmado",
  },
];

function StatusBadge({ status }: { status: Appointment["status"] }) {
  const statusConfig = {
    Confirmado: "text-emerald-600",
    Pendente: "text-yellow-600",
    Cancelado: "text-red-600",
  };

  return (
    <div className="flex items-center gap-2">
      <span
        className={`h-2 w-2 rounded-full bg-current ${statusConfig[status]}`}
      />
      <span className={statusConfig[status]}>{status}</span>
    </div>
  );
}

export const AppointmentsTable = () => {
  return (
    <div className="rounded-lg border border-border bg-card">
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
                {appointment.paciente}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {appointment.data}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {appointment.medico}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {appointment.especialidade}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {appointment.valor}
              </TableCell>
              <TableCell>
                <StatusBadge status={appointment.status} />
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

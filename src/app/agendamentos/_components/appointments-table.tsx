"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { AppointmentWithRelations } from "@/types/appointment-with-relations";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { StatusBadge } from "@/app/_components/status-badge";
import { useState } from "react";
import { DeleteAppointmentDialog } from "./delete-appointment-dialog";
import { EditAppointmentDialog } from "./edit-appointment-dialog";

interface AppointmentsTableProps {
  appointments: AppointmentWithRelations[];
  status: "Confirmado" | "Finalizado";
  doctors: any[];
  patients: any[];
}

export const AppointmentsTable = ({
  appointments,
  status,
  doctors,
  patients,
}: AppointmentsTableProps) => {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editAppointment, setEditAppointment] =
    useState<AppointmentWithRelations | null>(null);

  return (
    <>
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
              <TableHead className="w-20"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-foreground font-medium">
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell className="font-medium ">
                  {appointment.patient.name}
                </TableCell>
                <TableCell>
                  {format(new Date(appointment.date), "dd/MM/yy, HH:mm", {
                    locale: ptBR,
                  })}
                </TableCell>
                <TableCell>{appointment.doctor.name}</TableCell>
                <TableCell>{appointment.doctor.specialty.name}</TableCell>
                <TableCell>
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
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 cursor-pointer"
                      onClick={() => setEditAppointment(appointment)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 cursor-pointer"
                      onClick={() => setDeleteId(appointment.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {deleteId && (
        <DeleteAppointmentDialog
          open={!!deleteId}
          onOpenChange={(open) => !open && setDeleteId(null)}
          appointmentId={deleteId}
        />
      )}

      {editAppointment && (
        <EditAppointmentDialog
          open={!!editAppointment}
          onOpenChange={(open) => !open && setEditAppointment(null)}
          appointment={editAppointment}
          doctors={doctors}
          patients={patients}
        />
      )}
    </>
  );
};

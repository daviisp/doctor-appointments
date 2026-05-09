"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { AppointmentWithRelations } from "@/types/appointment-with-relations";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { StatusBadge } from "@/app/_components/status-badge";
import { DeleteAppointmentDialog } from "./delete-appointment-dialog";
import { EditAppointmentDialog } from "./edit-appointment-dialog";

interface AppointmentsCardsProps {
  appointments: AppointmentWithRelations[];
  status: "Confirmado" | "Finalizado";
  doctors: any[];
  patients: any[];
}

export const AppointmentsCards = ({
  appointments,
  status,
  doctors,
  patients,
}: AppointmentsCardsProps) => {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editAppointment, setEditAppointment] =
    useState<AppointmentWithRelations | null>(null);

  return (
    <>
      <div className="flex flex-col gap-3 md:hidden">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="rounded-lg border border-border bg-card p-4 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-foreground">
                {appointment.patient.name}
              </span>
              <StatusBadge status={status} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground">
                📅{" "}
                {format(new Date(appointment.date), "dd/MM/yy, HH:mm", {
                  locale: ptBR,
                })}
              </span>
              <span className="text-xs text-muted-foreground">
                👨‍⚕️ {appointment.doctor.name}
              </span>
              <span className="text-xs text-muted-foreground">
                🏥 {appointment.doctor.specialty.name}
              </span>
              <span className="text-xs text-muted-foreground">
                💰{" "}
                {(appointment.doctor.appointmentPrice / 100).toLocaleString(
                  "pt-BR",
                  {
                    style: "currency",
                    currency: "BRL",
                  },
                )}
              </span>
            </div>
            <div className="flex justify-end gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 cursor-pointer"
                onClick={() => setEditAppointment(appointment)}
              >
                <Pencil className="h-4 w-4 text-muted-foreground" />
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
          </div>
        ))}
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

import { Calendar } from "lucide-react";
import { AppointmentsCards } from "./appointments-cards";
import { AppointmentsTable } from "./appointments-table";
import { AppointmentWithRelations } from "@/types/appointment-with-relations";

interface AppointmentsSectionProps {
  title: string;
  appointments: AppointmentWithRelations[];
}

export const AppointmentsSection = ({
  title,
  appointments,
}: AppointmentsSectionProps) => {
  if (appointments.length === 0) return null;

  const isPast = title === "Agendamentos anteriores";

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-[#1a56db]" />
        <h2 className="text-base font-semibold tracking-wide">{title}</h2>
      </div>
      <AppointmentsTable
        appointments={appointments}
        status={isPast ? "Finalizado" : "Confirmado"}
      />
      <AppointmentsCards
        appointments={appointments}
        status={isPast ? "Finalizado" : "Confirmado"}
      />
    </div>
  );
};

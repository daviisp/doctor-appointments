import { AppointmentWithRelations } from "@/types/appointment-with-relations";
import { AppointmentsTable } from "./appointments-table";
import { AppointmentsCards } from "./appointments-cards";
import { Calendar } from "lucide-react";

interface AppointmentsSectionProps {
  title: string;
  appointments: AppointmentWithRelations[];
  doctors: any[];
  patients: any[];
}

export const AppointmentsSection = ({
  title,
  appointments,
  doctors,
  patients,
}: AppointmentsSectionProps) => {
  if (appointments.length === 0) return null;

  const isPast = title === "Agendamentos anteriores";

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-[#1a56db]" />
        <h2 className="tracking-wide text-base font-semibold">{title}</h2>
      </div>
      <AppointmentsTable
        appointments={appointments}
        status={isPast ? "Finalizado" : "Confirmado"}
        doctors={doctors}
        patients={patients}
      />
      <AppointmentsCards
        appointments={appointments}
        status={isPast ? "Finalizado" : "Confirmado"}
        doctors={doctors}
        patients={patients}
      />
    </div>
  );
};

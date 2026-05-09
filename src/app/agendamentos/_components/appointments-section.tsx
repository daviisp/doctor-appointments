import { AppointmentWithRelations } from "@/types/appointment-with-relations";
import { AppointmentsTable } from "./appointments-table";
import { AppointmentsCards } from "./appointments-cards";

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
      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
        {title}
      </h2>
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

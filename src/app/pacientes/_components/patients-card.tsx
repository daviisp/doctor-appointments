import { formatCpf, formatPhone } from "@/lib/utils";
import { Patient } from "@/types/patient";

interface PatientsCardsProps {
  patients: Patient[];
}

export const PatientsCards = ({ patients }: PatientsCardsProps) => {
  return (
    <div className="flex flex-col gap-3 md:hidden">
      {patients.map((patient) => (
        <div
          key={patient.id}
          className="rounded-lg border border-border bg-card p-4 flex flex-col gap-2"
        >
          <div className="flex items-center justify-between">
            <span className="font-medium text-sm text-foreground">
              {patient.name}
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              {patient.sex === "FEMALE" ? "Feminino" : "Masculino"}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">
              📱 {formatPhone(patient.phone)}
            </span>
            <span className="text-xs text-muted-foreground">
              🪪 {formatCpf(patient.cpf)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCpf, formatPhone } from "@/lib/utils";
import { Patient } from "@/types/patient";
import { DeletePatientDialog } from "./delete-patient-dialog";
import { EditPatientDialog } from "./edit-patient-dialog";

interface PatientsCardsProps {
  patients: Patient[];
}

export const PatientsCards = ({ patients }: PatientsCardsProps) => {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editPatient, setEditPatient] = useState<Patient | null>(null);

  return (
    <>
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
                📱{" "}
                {patient.phone ? formatPhone(patient.phone) : "Não informado"}
              </span>
              <span className="text-xs text-muted-foreground">
                🪪 {patient.cpf ? formatCpf(patient.cpf) : "Não informado"}
              </span>
              <span className="text-xs text-muted-foreground">
                🎂{" "}
                {patient.dateOfBirth
                  ? format(new Date(patient.dateOfBirth), "dd/MM/yyyy", {
                      locale: ptBR,
                    })
                  : "Não informado"}
              </span>
            </div>
            <div className="flex justify-end gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 cursor-pointer"
                onClick={() => setEditPatient(patient)}
              >
                <Pencil className="h-4 w-4 text-muted-foreground" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 cursor-pointer"
                onClick={() => setDeleteId(patient.id)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {deleteId && (
        <DeletePatientDialog
          open={!!deleteId}
          onOpenChange={(open) => !open && setDeleteId(null)}
          patientId={deleteId}
        />
      )}

      {editPatient && (
        <EditPatientDialog
          key={`edit-${editPatient.id}`}
          open={!!editPatient}
          onOpenChange={(open) => !open && setEditPatient(null)}
          patient={editPatient}
        />
      )}
    </>
  );
};

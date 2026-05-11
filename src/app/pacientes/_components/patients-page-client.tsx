"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "../../_components/header";
import { PatientsTable } from "./patients-table";
import { CreatePatientDialog } from "./create-patient-dialog";
import { Patient } from "@/types/patient";
import { PatientsCards } from "./patients-card";

interface PatientsPageClientProps {
  patients: Patient[];
}

export const PatientsPageClient = ({ patients }: PatientsPageClientProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="p-4 sm:p-6 lg:ml-72">
        <div className="mx-auto max-w-7xl space-y-6">
          <Header
            title="Pacientes"
            subTitle="Pacientes"
            description="Gerencie os pacientes da clínica"
            action={
              <Button
                className="bg-[#1a56db] hover:bg-[#1a56db]/90 cursor-pointer w-full sm:w-auto"
                onClick={() => setDialogOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Adicionar paciente
              </Button>
            }
          />
          <PatientsTable patients={patients} />
          <PatientsCards patients={patients} />
        </div>
      </div>
      <CreatePatientDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
};

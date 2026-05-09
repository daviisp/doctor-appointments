"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "../../_components/header";
import { AppointmentsSection } from "./appointments-section";
import { CreateAppointmentDialog } from "./create-appointment-dialog";
import { Separator } from "@/components/ui/separator";
import { AppointmentWithRelations } from "@/types/appointment-with-relations";

interface AppointmentsClientProps {
  upcoming: AppointmentWithRelations[];
  past: AppointmentWithRelations[];
  doctors: any[];
  patients: any[];
}

export const AppointmentsClient = ({
  upcoming,
  past,
  doctors,
  patients,
}: AppointmentsClientProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="p-4 sm:p-6 lg:ml-72">
        <div className="mx-auto max-w-7xl space-y-6">
          <Header
            title="Agendamentos"
            subTitle="Agendamentos"
            description="Gerencie todos os agendamentos da clínica"
            action={
              <Button
                className="bg-[#1a56db] hover:bg-[#1a56db]/90 cursor-pointer w-full sm:w-auto"
                onClick={() => setDialogOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Agendar consulta
              </Button>
            }
          />
          <div className="space-y-8 pt-4">
            <AppointmentsSection
              title="Próximos agendamentos"
              appointments={upcoming}
              doctors={doctors}
              patients={patients}
            />
            <Separator />
            <AppointmentsSection
              title="Agendamentos anteriores"
              appointments={past}
              doctors={doctors}
              patients={patients}
            />
          </div>
        </div>
      </div>
      <CreateAppointmentDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        doctors={doctors}
        patients={patients}
      />
    </div>
  );
};

"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Doctor } from "@/types/doctor";
import { Header } from "@/app/_components/header";
import { DoctorCard } from "./doctor-card";
import { CreateDoctorDialog } from "./create-doctor-dialog";

interface DoctorsPageClientProps {
  doctors: Doctor[];
  specialties: { id: string; name: string }[];
}

export const DoctorsPageClient = ({
  doctors,
  specialties,
}: DoctorsPageClientProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="p-4 sm:p-6 lg:ml-72">
        <div className="mx-auto max-w-7xl space-y-6">
          <Header
            title="Médicos"
            subTitle="Médicos"
            description="Gerencie os médicos da clínica"
            action={
              <Button
                className="bg-[#1a56db] hover:bg-[#1a56db]/90 cursor-pointer w-full sm:w-auto"
                onClick={() => setDialogOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Adicionar médico
              </Button>
            }
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </div>
      </div>
      <CreateDoctorDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        specialties={specialties}
      />
    </div>
  );
};

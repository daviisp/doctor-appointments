import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "../_components/header";
import { PatientsTable } from "./_components/patients-table";
import { PatientsCards } from "./_components/patients-card";
import { getPatients } from "@/actions/get-patients";

const PatientsPage = async () => {
  const patients = await getPatients();

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="p-4 sm:p-6 lg:ml-72">
        <div className="mx-auto max-w-7xl space-y-6">
          <Header
            title="Pacientes"
            subTitle="Pacientes"
            description="Gerencie os pacientes da clínica"
            action={
              <Button className="bg-[#1a56db] hover:bg-[#1a56db]/90 cursor-pointer w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Adicionar paciente
              </Button>
            }
          />
          <PatientsTable patients={patients} />
          <PatientsCards patients={patients} />
        </div>
      </div>
    </div>
  );
};

export default PatientsPage;

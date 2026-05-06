import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DoctorCard } from "./_components/doctor-card";
import { Header } from "../_components/header";
import { getDoctors } from "@/actions/get-doctors";

const DoctorsPage = async () => {
  const doctors = await getDoctors();

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="p-4 sm:p-6 lg:ml-72">
        <div className="mx-auto max-w-7xl space-y-6">
          <Header
            title="Médicos"
            subTitle="Médicos"
            description="Gerencie os médicos da clínica"
            action={
              <Button className="bg-[#1a56db] hover:bg-[#1a56db]/90 cursor-pointer w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Adicionar médico
              </Button>
            }
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {doctors.map((doctor, index) => (
              <DoctorCard key={index} doctor={doctor} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsPage;

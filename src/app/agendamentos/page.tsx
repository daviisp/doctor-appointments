import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "../_components/header";
import { AppointmentsSection } from "./_components/appointments-section";
import { getUpcomingAppointments } from "@/actions/get-upcoming-appointments";
import { getPastAppointments } from "@/actions/get-past-appointments";
import { Separator } from "@/components/ui/separator";

const AppointmentsPage = async () => {
  const [upcoming, past] = await Promise.all([
    getUpcomingAppointments(),
    getPastAppointments(),
  ]);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="p-4 sm:p-6 lg:ml-72">
        <div className="mx-auto max-w-7xl space-y-6">
          <Header
            title="Agendamentos"
            subTitle="Agendamentos"
            description="Gerencie todos os agendamentos da clínica"
            action={
              <Button className="bg-[#1a56db] hover:bg-[#1a56db]/90 cursor-pointer w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Agendar consulta
              </Button>
            }
          />
          <div className="space-y-8 pt-4">
            <AppointmentsSection
              title="Próximos agendamentos"
              appointments={upcoming}
            />
            <Separator />
            <AppointmentsSection
              title="Agendamentos anteriores"
              appointments={past}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage;

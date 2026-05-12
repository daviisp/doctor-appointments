import { AppointmentsTable } from "./_components/appointments-table";
import { DoctorsList } from "./_components/doctors-list";
import { Header } from "../../_components/header";
import { SpecialtiesList } from "./_components/specialties-list";
import { StatsCards } from "./_components/stats-card";
import { AppointmentsChartOnWeek } from "./_components/appointments-chart-on-week";
import { getAppointmentsChartOnWeek } from "@/actions/get-appointments-chart-on-week";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clínica Cemi - Painel",
};

const PanelPage = async () => {
  const chartData = await getAppointmentsChartOnWeek();

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="p-4 sm:p-6 lg:ml-72">
        <div className="mx-auto max-w-7xl space-y-6">
          <Header
            title="Painel"
            subTitle="Painel"
            description="Acesse uma visão detalhada das principais métricas e resultados dos pacientes"
          />
          <StatsCards />
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <AppointmentsChartOnWeek data={chartData} />
              <AppointmentsTable status="Confirmado" />
            </div>
            <div className="space-y-6">
              <DoctorsList />
              <SpecialtiesList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanelPage;

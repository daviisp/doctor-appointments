import { AppointmentsTable } from "./_components/appointments-table";
import { DoctorsList } from "./_components/doctors-list";
import { Header } from "../../_components/header";
import { SpecialtiesList } from "./_components/specialties-list";
import { StatsCards } from "./_components/stats-card";
import { PatientsChart } from "./_components/patients-chart";
import { getPatientsChartData } from "@/actions/get-patients-chart-data";

const PanelPage = async () => {
  const chartData = await getPatientsChartData();

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="p-4 sm:p-6 lg:ml-72">
        <div className="mx-auto max-w-7xl space-y-6">
          <Header title="Painel" subTitle="Painel" />
          <StatsCards />
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <PatientsChart data={chartData} />
              <AppointmentsTable />
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

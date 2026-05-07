import { getUpcomingAppointments } from "@/actions/get-upcoming-appointments";
import { getPastAppointments } from "@/actions/get-past-appointments";
import { getDoctorsForSelect } from "@/actions/get-doctors-for-select";
import { getPatientsForSelect } from "@/actions/get-patients-for-select";
import { AppointmentsClient } from "./_components/appointments-client";

const AppointmentsPage = async () => {
  const [upcoming, past, doctors, patients] = await Promise.all([
    getUpcomingAppointments(),
    getPastAppointments(),
    getDoctorsForSelect(),
    getPatientsForSelect(),
  ]);

  return (
    <AppointmentsClient
      upcoming={upcoming}
      past={past}
      doctors={doctors}
      patients={patients}
    />
  );
};

export default AppointmentsPage;

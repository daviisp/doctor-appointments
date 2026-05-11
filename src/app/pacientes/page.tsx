import { getPatients } from "@/actions/get-patients";
import { PatientsPageClient } from "./_components/patients-page-client";

const PatientsPage = async () => {
  const patients = await getPatients();
  return <PatientsPageClient patients={patients} />;
};

export default PatientsPage;

import { getPatients } from "@/actions/get-patients";
import { PatientsPageClient } from "./_components/patients-page-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clínica Cemi - Pacientes",
};

const PatientsPage = async () => {
  const patients = await getPatients();
  return <PatientsPageClient patients={patients} />;
};

export default PatientsPage;

import { getDoctors } from "@/actions/get-doctors";
import { DoctorsPageClient } from "./_components/doctor-page-client";
import { getSpecialtiesForSelect } from "@/actions/get-specialties-for-select";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clínica Cemi - Médicos",
};

const DoctorsPage = async () => {
  const [doctors, specialties] = await Promise.all([
    getDoctors(),
    getSpecialtiesForSelect(),
  ]);

  return <DoctorsPageClient doctors={doctors} specialties={specialties} />;
};

export default DoctorsPage;

export type AppointmentWithRelations = {
  id: string;
  date: Date;
  patientId: string;
  doctorId: string;
  patient: {
    name: string;
  };
  doctor: {
    name: string;
    appointmentPrice: number;
    specialty: {
      name: string;
    };
  };
};

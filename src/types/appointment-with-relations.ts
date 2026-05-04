export type AppointmentWithRelations = {
  id: string;
  date: Date;
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

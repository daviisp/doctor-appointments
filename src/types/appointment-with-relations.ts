export type AppointmentWithRelations = {
  id: string;
  date: Date;
  patient: {
    name: string;
  };
  doctor: {
    name: string;
  };
};

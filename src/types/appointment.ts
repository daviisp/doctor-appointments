export type Appointment = {
  id: string;
  date: Date;
  patient: {
    name: string;
  };
  doctor: {
    name: string;
  };
};

export type Doctor = {
  id: string;
  name: string;
  avatarUrl: string | null;
  appointmentPrice: number;
  specialty: {
    name: string;
  };
  availabilities: {
    weekDay: number;
    startTime: string;
    endTime: string;
  }[];
};

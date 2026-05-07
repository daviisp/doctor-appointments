export type Patient = {
  id: string;
  name: string;
  phone: string;
  cpf: string;
  sex: "MALE" | "FEMALE";
  dateOfBirth: Date | null;
};

export type Patient = {
  id: string;
  name: string;
  phone: string | null;
  cpf: string | null;
  sex: "MALE" | "FEMALE";
  dateOfBirth: Date | null;
};

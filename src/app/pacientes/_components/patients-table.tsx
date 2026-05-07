import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCpf, formatPhone } from "@/lib/utils";
import { Patient } from "@/types/patient";
import { ExternalLink } from "lucide-react";

interface PatientsTableProps {
  patients: Patient[];
}

export const PatientsTable = ({ patients }: PatientsTableProps) => {
  return (
    <div className="hidden md:block bg-card rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="py-4 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Nome
            </TableHead>
            <TableHead className="py-4 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Número de Celular
            </TableHead>
            <TableHead className="py-4 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              CPF
            </TableHead>
            <TableHead className="py-4 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Sexo
            </TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-foreground font-medium">
          {patients.map((patient, index) => (
            <TableRow
              key={patient.id}
              className={index % 2 === 0 ? "bg-card" : "bg-muted/20"}
            >
              <TableCell className="py-4 px-6">
                <span className="text-sm font-medium">{patient.name}</span>
              </TableCell>
              <TableCell className="py-4 px-6 ">
                <span className="text-sm">{formatPhone(patient.phone)}</span>
              </TableCell>
              <TableCell className="py-4 px-6">
                <span className="text-sm">{formatCpf(patient.cpf)}</span>
              </TableCell>
              <TableCell className="py-4 px-6">
                <span className="text-sm">
                  {patient.sex === "FEMALE" ? "Feminino" : "Masculino"}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

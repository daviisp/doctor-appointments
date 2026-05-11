"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { formatCpf, formatPhone } from "@/lib/utils";
import { Patient } from "@/types/patient";
import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DeletePatientDialog } from "./delete-patient-dialog";
import { EditPatientDialog } from "./edit-patient-dialog";

interface PatientsTableProps {
  patients: Patient[];
}

export const PatientsTable = ({ patients }: PatientsTableProps) => {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editPatient, setEditPatient] = useState<Patient | null>(null);

  return (
    <>
      <div className="hidden md:block bg-card rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="py-4 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Nome
              </TableHead>
              <TableHead className="py-4 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Celular
              </TableHead>
              <TableHead className="py-4 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                CPF
              </TableHead>
              <TableHead className="py-4 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Sexo
              </TableHead>
              <TableHead className="py-4 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Data de Nascimento
              </TableHead>
              <TableHead className="w-20"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient, index) => (
              <TableRow
                key={patient.id}
                className={index % 2 === 0 ? "bg-card" : "bg-muted/20"}
              >
                <TableCell className="py-4 px-6">
                  <span className="text-sm font-medium">{patient.name}</span>
                </TableCell>
                <TableCell className="py-4 px-6">
                  <span className="text-sm text-foreground font-medium">
                    {patient.phone
                      ? formatPhone(patient.phone)
                      : "Não informado"}
                  </span>
                </TableCell>
                <TableCell className="py-4 px-6">
                  <span className="text-sm text-foreground font-medium">
                    {patient.cpf ? formatCpf(patient.cpf) : "Não informado"}
                  </span>
                </TableCell>
                <TableCell className="py-4 px-6">
                  <span className="text-sm text-foreground font-medium">
                    {patient.sex === "FEMALE" ? "Feminino" : "Masculino"}
                  </span>
                </TableCell>
                <TableCell className="py-4 px-6">
                  <span className="text-sm text-foreground font-medium">
                    {patient.dateOfBirth
                      ? format(new Date(patient.dateOfBirth), "dd/MM/yyyy", {
                          locale: ptBR,
                        })
                      : "Não informado"}
                  </span>
                </TableCell>
                <TableCell className="py-4 px-6">
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 cursor-pointer"
                      onClick={() => setEditPatient(patient)}
                    >
                      <Pencil className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 cursor-pointer"
                      onClick={() => setDeleteId(patient.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {deleteId && (
        <DeletePatientDialog
          open={!!deleteId}
          onOpenChange={(open) => !open && setDeleteId(null)}
          patientId={deleteId}
        />
      )}

      {editPatient && (
        <EditPatientDialog
          key={`edit-${editPatient.id}`}
          open={!!editPatient}
          onOpenChange={(open) => !open && setEditPatient(null)}
          patient={editPatient}
        />
      )}
    </>
  );
};

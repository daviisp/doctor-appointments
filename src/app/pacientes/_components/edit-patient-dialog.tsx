"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { updatePatient } from "@/actions/update-patient";
import { Patient } from "@/types/patient";
import { formatCpfInput, formatPhoneInput, validateCpf } from "@/lib/utils";
import { useState, useEffect } from "react";
import { format } from "date-fns";

const schema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  phone: z.string().optional(),
  cpf: z
    .string()
    .optional()
    .refine((val) => !val || validateCpf(val), { message: "CPF inválido" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sexo é obrigatório" }),
  dateOfBirth: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface EditPatientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patient: Patient;
}

export const EditPatientDialog = ({
  open,
  onOpenChange,
  patient,
}: EditPatientDialogProps) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingData, setPendingData] = useState<FormData | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: patient.name,
      phone: patient.phone ? formatPhoneInput(patient.phone) : "",
      cpf: patient.cpf ? formatCpfInput(patient.cpf) : "",
      sex: patient.sex,
      dateOfBirth: patient.dateOfBirth
        ? format(new Date(patient.dateOfBirth), "yyyy-MM-dd")
        : "",
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        name: patient.name,
        phone: patient.phone ? formatPhoneInput(patient.phone) : "",
        cpf: patient.cpf ? formatCpfInput(patient.cpf) : "",
        sex: patient.sex,
        dateOfBirth: patient.dateOfBirth
          ? format(new Date(patient.dateOfBirth), "yyyy-MM-dd")
          : "",
      });
    }
  }, [open]);

  const getMissingFields = (data: FormData) => {
    const missing = [];
    if (!data.phone) missing.push("número de celular");
    if (!data.cpf) missing.push("CPF");
    return missing;
  };

  const onSubmit = async (data: FormData) => {
    const missing = getMissingFields(data);
    if (missing.length > 0) {
      setPendingData(data);
      setConfirmOpen(true);
      return;
    }
    await savePatient(data);
  };

  const savePatient = async (data: FormData) => {
    const result = await updatePatient({
      id: patient.id,
      name: data.name,
      phone: data.phone ? data.phone.replace(/\D/g, "") : null,
      cpf: data.cpf ? data.cpf.replace(/\D/g, "") : null,
      sex: data.sex,
      dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
    });

    if (result?.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Paciente atualizado com sucesso!");
    onOpenChange(false);
  };

  const handleConfirm = async () => {
    if (pendingData) {
      setConfirmOpen(false);
      await savePatient(pendingData);
      setPendingData(null);
    }
  };

  const missingFields = pendingData ? getMissingFields(pendingData) : [];

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar paciente</DialogTitle>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel>Nome</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    placeholder="Nome do paciente"
                    {...form.register("name")}
                  />
                </InputGroup>
                {form.formState.errors.name && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </Field>

              <Field>
                <FieldLabel>Número de celular</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    placeholder="(00) 00000-0000"
                    {...form.register("phone")}
                    onChange={(e) =>
                      form.setValue("phone", formatPhoneInput(e.target.value))
                    }
                  />
                </InputGroup>
              </Field>

              <Field>
                <FieldLabel>CPF</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    placeholder="000.000.000-00"
                    {...form.register("cpf")}
                    onChange={(e) =>
                      form.setValue("cpf", formatCpfInput(e.target.value))
                    }
                  />
                </InputGroup>
                {form.formState.errors.cpf && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.cpf.message}
                  </p>
                )}
              </Field>

              <Field>
                <FieldLabel>Sexo</FieldLabel>
                <Select
                  key={open ? patient.sex : "closed"}
                  onValueChange={(value) =>
                    form.setValue("sex", value as "MALE" | "FEMALE")
                  }
                  value={form.watch("sex")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o sexo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MALE">Masculino</SelectItem>
                    <SelectItem value="FEMALE">Feminino</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.sex && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.sex.message}
                  </p>
                )}
              </Field>

              <Field>
                <FieldLabel>Data de nascimento</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    type="date"
                    {...form.register("dateOfBirth")}
                  />
                </InputGroup>
              </Field>

              <Button
                type="submit"
                className="w-full bg-[#1a56db] hover:bg-[#1a56db]/90 cursor-pointer"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Spinner className="mr-2" />
                    Salvando...
                  </>
                ) : (
                  "Salvar"
                )}
              </Button>
            </FieldGroup>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Informações incompletas</AlertDialogTitle>
            <AlertDialogDescription>
              Você está prestes a editar o paciente sem{" "}
              <span className="font-bold">{missingFields.join(" e ")}</span>.
              Deseja continuar mesmo assim?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPendingData(null)}>
              Voltar e preencher
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              className="bg-[#1a56db] hover:bg-[#1a56db]/90 cursor-pointer"
            >
              Salvar assim mesmo
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

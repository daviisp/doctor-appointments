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
import { Checkbox } from "@/components/ui/checkbox";
import { updateDoctor } from "@/actions/update-doctor";
import { Doctor } from "@/types/doctor";
import { normalizeTime } from "@/lib/utils";
import { useEffect } from "react";
import { ChevronDown } from "lucide-react";

const weekDays = [
  { label: "Segunda", value: 1 },
  { label: "Terça", value: 2 },
  { label: "Quarta", value: 3 },
  { label: "Quinta", value: 4 },
  { label: "Sexta", value: 5 },
];

const schema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  specialtyId: z.string().min(1, "Especialidade é obrigatória"),
  appointmentPrice: z.string().min(1, "Valor é obrigatório"),
  availabilities: z
    .array(
      z.object({
        weekDay: z.number(),
        startTime: z.string().min(1, "Horário inicial é obrigatório"),
        endTime: z.string().min(1, "Horário final é obrigatório"),
      }),
    )
    .min(1, "Selecione pelo menos um dia"),
});

type FormData = z.infer<typeof schema>;

interface Specialty {
  id: string;
  name: string;
}

interface EditDoctorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  doctor: Doctor;
  specialties: Specialty[];
}

export const EditDoctorDialog = ({
  open,
  onOpenChange,
  doctor,
  specialties,
}: EditDoctorDialogProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: doctor.name,
      specialtyId: doctor.specialty.id,
      appointmentPrice: (doctor.appointmentPrice / 100)
        .toFixed(2)
        .replace(".", ","),
      availabilities: doctor.availabilities.map((a) => ({
        weekDay: a.weekDay,
        startTime: a.startTime,
        endTime: a.endTime,
      })),
    },
  });

  const availabilities = form.watch("availabilities");

  const toggleWeekDay = (day: number) => {
    const current = form.getValues("availabilities");
    const exists = current.find((a) => a.weekDay === day);

    if (exists) {
      form.setValue(
        "availabilities",
        current.filter((a) => a.weekDay !== day),
      );
    } else {
      form.setValue(
        "availabilities",
        [...current, { weekDay: day, startTime: "", endTime: "" }].sort(
          (a, b) => a.weekDay - b.weekDay,
        ),
      );
    }
  };

  const updateAvailability = (
    day: number,
    field: "startTime" | "endTime",
    value: string,
  ) => {
    const current = form.getValues("availabilities");
    form.setValue(
      "availabilities",
      current.map((a) => (a.weekDay === day ? { ...a, [field]: value } : a)),
    );
  };

  const onSubmit = async (data: FormData) => {
    const priceInCents = Math.round(
      parseFloat(data.appointmentPrice.replace(",", ".")) * 100,
    );

    const result = await updateDoctor({
      id: doctor.id,
      name: data.name,
      specialtyId: data.specialtyId,
      appointmentPrice: priceInCents,
      availabilities: data.availabilities,
    });

    if (result?.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Médico atualizado com sucesso!");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar médico</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel>Nome</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  placeholder="Nome do médico"
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
              <FieldLabel>Especialidade</FieldLabel>
              <div className="relative">
                <select
                  value={form.watch("specialtyId")}
                  onChange={(e) => form.setValue("specialtyId", e.target.value)}
                  className="w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  {specialties.map((specialty) => (
                    <option key={specialty.id} value={specialty.id}>
                      {specialty.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
              {form.formState.errors.specialtyId && (
                <p className="text-sm text-red-500 mt-1">
                  {form.formState.errors.specialtyId.message}
                </p>
              )}
            </Field>

            <Field>
              <FieldLabel>Valor da consulta (R$)</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  placeholder="Ex: 250,00"
                  {...form.register("appointmentPrice")}
                />
              </InputGroup>
              {form.formState.errors.appointmentPrice && (
                <p className="text-sm text-red-500 mt-1">
                  {form.formState.errors.appointmentPrice.message}
                </p>
              )}
            </Field>

            <Field>
              <FieldLabel>Dias de atendimento</FieldLabel>
              <div className="space-y-3 mt-1">
                {weekDays.map((day) => {
                  const isSelected = availabilities.some(
                    (a) => a.weekDay === day.value,
                  );
                  const availability = availabilities.find(
                    (a) => a.weekDay === day.value,
                  );

                  return (
                    <div key={day.value} className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleWeekDay(day.value)}
                        />
                        <span className="text-sm font-medium">{day.label}</span>
                      </label>

                      {isSelected && availability && (
                        <div className="grid grid-cols-2 gap-3 ml-6">
                          <Field>
                            <FieldLabel>Início</FieldLabel>
                            <InputGroup>
                              <InputGroupInput
                                placeholder="08:00"
                                value={availability.startTime}
                                onChange={(e) =>
                                  updateAvailability(
                                    day.value,
                                    "startTime",
                                    e.target.value,
                                  )
                                }
                                onBlur={(e) =>
                                  updateAvailability(
                                    day.value,
                                    "startTime",
                                    normalizeTime(e.target.value),
                                  )
                                }
                              />
                            </InputGroup>
                          </Field>
                          <Field>
                            <FieldLabel>Fim</FieldLabel>
                            <InputGroup>
                              <InputGroupInput
                                placeholder="17:00"
                                value={availability.endTime}
                                onChange={(e) =>
                                  updateAvailability(
                                    day.value,
                                    "endTime",
                                    e.target.value,
                                  )
                                }
                                onBlur={(e) =>
                                  updateAvailability(
                                    day.value,
                                    "endTime",
                                    normalizeTime(e.target.value),
                                  )
                                }
                              />
                            </InputGroup>
                          </Field>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              {form.formState.errors.availabilities && (
                <p className="text-sm text-red-500 mt-1">
                  {form.formState.errors.availabilities.message}
                </p>
              )}
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
  );
};

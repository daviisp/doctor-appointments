"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { getAvailableSlots } from "@/actions/get-available-slots";
import { createAppointment } from "@/actions/create-appointment";
import { Calendar as CalendarIcon } from "lucide-react";

const schema = z.object({
  patientId: z.string().min(1, "Selecione um paciente"),
  doctorId: z.string().min(1, "Selecione um médico"),
  date: z.date("Selecione uma data"),
  time: z.string().min(1, "Selecione um horário"),
});

type FormData = z.infer<typeof schema>;

interface Doctor {
  id: string;
  name: string;
  specialty: { name: string };
  availabilities: {
    weekDay: number;
    startTime: string;
    endTime: string;
  }[];
}

interface Patient {
  id: string;
  name: string;
}

interface CreateAppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  doctors: Doctor[];
  patients: Patient[];
}

export const CreateAppointmentDialog = ({
  open,
  onOpenChange,
  doctors,
  patients,
}: CreateAppointmentDialogProps) => {
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [patientOpen, setPatientOpen] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      patientId: "",
      doctorId: "",
      time: "",
    },
  });

  const selectedDoctorId = form.watch("doctorId");
  const selectedDate = form.watch("date");
  const selectedDoctor = doctors.find((d) => d.id === selectedDoctorId);
  const availableWeekDays =
    selectedDoctor?.availabilities.map((a) => a.weekDay) ?? [];

  useEffect(() => {
    if (selectedDoctorId && selectedDate) {
      form.setValue("time", "");
      getAvailableSlots(selectedDoctorId, selectedDate).then(setAvailableSlots);
    }
  }, [selectedDoctorId, selectedDate]);

  const onSubmit = async (data: FormData) => {
    const [hours, minutes] = data.time.split(":").map(Number);
    const date = new Date(data.date);
    date.setHours(hours, minutes, 0, 0);

    const result = await createAppointment({
      patientId: data.patientId,
      doctorId: data.doctorId,
      date,
    });

    if (result?.error) {
      toast.error("Algo deu errado. Tente novamente.");
      return;
    }

    toast.success("Agendamento criado com sucesso!");
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-[#1a56db]" />
            <DialogTitle className="text-base">Novo agendamento</DialogTitle>
          </div>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel>Paciente</FieldLabel>
              <Popover open={patientOpen} onOpenChange={setPatientOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start font-normal",
                      !form.watch("patientId") && "text-muted-foreground",
                    )}
                  >
                    {form.watch("patientId")
                      ? patients.find((p) => p.id === form.watch("patientId"))
                          ?.name
                      : "Selecione um paciente"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-full" align="start">
                  <Command>
                    <CommandInput placeholder="Buscar paciente..." />
                    <CommandList>
                      <CommandEmpty>Nenhum paciente encontrado.</CommandEmpty>
                      <CommandGroup>
                        {patients.map((patient) => (
                          <CommandItem
                            key={patient.id}
                            value={patient.name}
                            onSelect={() => {
                              form.setValue("patientId", patient.id);
                              setPatientOpen(false);
                            }}
                          >
                            {patient.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              {form.formState.errors.patientId && (
                <p className="text-sm text-red-500 mt-1">
                  {form.formState.errors.patientId.message}
                </p>
              )}
            </Field>
            <Field>
              <FieldLabel>Médico</FieldLabel>
              <Select
                onValueChange={(value) => {
                  form.setValue("doctorId", value);
                  form.setValue("date", undefined as any);
                  form.setValue("time", "");
                }}
                value={form.watch("doctorId")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um médico" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.id}>
                      {doctor.name} — {doctor.specialty.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.doctorId && (
                <p className="text-sm text-red-500 mt-1">
                  {form.formState.errors.doctorId.message}
                </p>
              )}
            </Field>
            {selectedDoctor && (
              <Field>
                <FieldLabel>Data</FieldLabel>
                <Calendar
                  mode="single"
                  selected={form.watch("date")}
                  onSelect={(date) => form.setValue("date", date as Date)}
                  locale={ptBR}
                  disabled={(date) => {
                    const day = date.getDay();
                    const isPast =
                      date < new Date(new Date().setHours(0, 0, 0, 0));
                    return isPast || !availableWeekDays.includes(day);
                  }}
                  className="rounded-md border w-full"
                />
                {form.formState.errors.date && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.date.message}
                  </p>
                )}
              </Field>
            )}
            {selectedDate && availableSlots.length > 0 && (
              <Field>
                <FieldLabel>Horário</FieldLabel>
                <Select
                  onValueChange={(value) => form.setValue("time", value)}
                  value={form.watch("time")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um horário" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.time && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.time.message}
                  </p>
                )}
              </Field>
            )}

            {selectedDate && availableSlots.length === 0 && (
              <p className="text-sm text-muted-foreground">
                Nenhum horário disponível para este dia.
              </p>
            )}

            <Button
              type="submit"
              className="w-full bg-[#1a56db] hover:bg-[#1a56db]/90 cursor-pointer"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Spinner className="mr-2" />
                  Agendando...
                </>
              ) : (
                "Agendar"
              )}
            </Button>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
};

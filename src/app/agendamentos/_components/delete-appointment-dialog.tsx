"use client";

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
import { toast } from "sonner";
import { deleteAppointment } from "@/actions/delete-appointment";

interface DeleteAppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointmentId: string;
}

export const DeleteAppointmentDialog = ({
  open,
  onOpenChange,
  appointmentId,
}: DeleteAppointmentDialogProps) => {
  const handleDelete = async () => {
    const result = await deleteAppointment(appointmentId);

    if (result?.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Agendamento excluído com sucesso!");
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir agendamento</AlertDialogTitle>
          <AlertDialogDescription className="font-medium text-sm sm:text-base">
            Tem certeza que deseja excluir esse agendamento? Essa ação não
            poderá ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 cursor-pointer"
          >
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

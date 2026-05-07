import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, DollarSign, Stethoscope } from "lucide-react";
import { Doctor } from "@/types/doctor";

interface DoctorCardProps {
  doctor: Doctor;
}

const weekDayMap: Record<number, string> = {
  0: "Dom",
  1: "Seg",
  2: "Ter",
  3: "Qua",
  4: "Qui",
  5: "Sex",
  6: "Sáb",
};

export const DoctorCard = ({ doctor }: DoctorCardProps) => {
  const initials = doctor.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const days = doctor.availabilities
    .map((a) => weekDayMap[a.weekDay])
    .join(", ");

  const startTime = doctor.availabilities[0]?.startTime ?? "-";
  const endTime = doctor.availabilities[0]?.endTime ?? "-";

  return (
    <Card className="p-6 gap-4">
      <CardContent className="p-0 space-y-4">
        <div className="flex items-center gap-3">
          <Avatar className="size-16 bg-muted">
            <AvatarImage src={doctor.avatarUrl ?? ""} alt={doctor.name} />
            <AvatarFallback className="bg-slate-200 text-slate-600 text-lg font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-foreground">{doctor.name}</h3>
            <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
              <Stethoscope className="size-4" />
              <span>{doctor.specialty.name}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 text-sm font-medium text-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="size-4" />
            <span>{days}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="size-4" />
            <span>
              Das {startTime} às {endTime}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="size-4" />
            <span>
              {(doctor.appointmentPrice / 100).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

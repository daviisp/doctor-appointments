import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Stethoscope } from "lucide-react";
import Link from "next/link";

const doctors = [
  {
    name: "Dr. Lucas Moreira",
    specialty: "Cardiologista",
    appointments: 52,
    avatar: "/doctors/doctor1.jpg",
    initials: "LM",
  },
  {
    name: "Dr. Camila Ferreira",
    specialty: "Ginecologista",
    appointments: 45,
    avatar: "/doctors/doctor2.jpg",
    initials: "CF",
  },
  {
    name: "Dr. Rafael Santos",
    specialty: "Pediatria",
    appointments: 38,
    avatar: "/doctors/doctor3.jpg",
    initials: "RS",
  },
  {
    name: "Dr. Mariana Almeida",
    specialty: "Dermatologista",
    appointments: 35,
    avatar: "/doctors/doctor4.jpg",
    initials: "MA",
  },
];

export const DoctorsList = () => {
  return (
    <Card className="border border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <Stethoscope className="h-4 w-4 text-[#1a56db]" />
            Médicos
          </CardTitle>
          <Link
            href="/medicos"
            className="text-xs text-[#1a56db] hover:underline"
          >
            Ver todos
          </Link>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {doctors.map((doctor, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={doctor.avatar} alt={doctor.name} />
                  <AvatarFallback className="bg-muted text-xs">
                    {doctor.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{doctor.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {doctor.specialty}
                  </p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">
                {doctor.appointments} agend.
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Baby, Stethoscope, Sparkles, Bone } from "lucide-react";
import Link from "next/link";

const specialties = [
  {
    name: "Cardiologia",
    appointments: 52,
    icon: Heart,
    color: "bg-red-100",
    iconColor: "text-red-500",
    progress: 100,
    progressColor: "bg-red-500",
  },
  {
    name: "Ginecologia",
    appointments: 45,
    icon: Sparkles,
    color: "bg-amber-100",
    iconColor: "text-amber-500",
    progress: 86,
    progressColor: "bg-amber-500",
  },
  {
    name: "Pediatria",
    appointments: 38,
    icon: Baby,
    color: "bg-pink-100",
    iconColor: "text-pink-500",
    progress: 73,
    progressColor: "bg-pink-500",
  },
  {
    name: "Dermatologia",
    appointments: 35,
    icon: Stethoscope,
    color: "bg-cyan-100",
    iconColor: "text-cyan-500",
    progress: 67,
    progressColor: "bg-cyan-500",
  },
  {
    name: "Ortopedia",
    appointments: 33,
    icon: Bone,
    color: "bg-blue-100",
    iconColor: "text-blue-500",
    progress: 63,
    progressColor: "bg-blue-500",
  },
];

export const SpecialtiesList = () => {
  return (
    <Card className="border border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">
            Especialidades
          </CardTitle>
          <Link
            href="/especialidades"
            className="text-xs text-[#1a56db] hover:underline"
          >
            Ver todos
          </Link>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {specialties.map((specialty, index) => (
            <div key={index} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${specialty.color}`}
                  >
                    <specialty.icon
                      className={`h-4 w-4 ${specialty.iconColor}`}
                    />
                  </div>
                  <span className="text-sm font-medium">{specialty.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {specialty.appointments} agend.
                </span>
              </div>
              <div className="ml-10">
                <div className="h-1.5 w-full rounded-full bg-muted">
                  <div
                    className={`h-1.5 rounded-full ${specialty.progressColor}`}
                    style={{ width: `${specialty.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

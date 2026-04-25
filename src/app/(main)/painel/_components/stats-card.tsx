import { DollarSign, Calendar, Users, Stethoscope } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    title: "Faturamento",
    value: "R$ 31.760",
    icon: DollarSign,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    title: "Agendamentos",
    value: "203",
    icon: Calendar,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Pacientes",
    value: "45",
    icon: Users,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    title: "Médicos",
    value: "12",
    icon: Stethoscope,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
];

export const StatsCards = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="border border-border py-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.iconBg}`}
              >
                <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{stat.title}</p>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

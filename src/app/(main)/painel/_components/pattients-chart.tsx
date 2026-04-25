"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Users } from "lucide-react";

const data = [
  { day: "Dom", pacientes: 8, novos: 4 },
  { day: "Seg", pacientes: 12, novos: 6 },
  { day: "Ter", pacientes: 14, novos: 5 },
  { day: "Qua", pacientes: 18, novos: 8 },
  { day: "Qui", pacientes: 15, novos: 7 },
  { day: "Sex", pacientes: 20, novos: 10 },
  { day: "Sáb", pacientes: 16, novos: 8 },
];

export const PatientsChart = () => {
  return (
    <Card className="border border-border">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <Users className="h-4 w-4 text-[#1a56db]" />
          Pacientes
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} barGap={0}>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              ticks={[5, 10, 15, 20]}
              domain={[0, 25]}
            />
            <Bar
              dataKey="pacientes"
              stackId="a"
              fill="#22c55e"
              radius={[0, 0, 0, 0]}
              barSize={32}
            />
            <Bar
              dataKey="novos"
              stackId="a"
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
              barSize={32}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

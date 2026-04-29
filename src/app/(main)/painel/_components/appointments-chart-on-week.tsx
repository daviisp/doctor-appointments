"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Users } from "lucide-react";

interface PatientsChartProps {
  data: {
    day: string;
    total: number;
  }[];
}

export const AppointmentsChartOnWeek = ({ data }: PatientsChartProps) => {
  return (
    <Card className="border border-border">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <Users className="h-4 w-4 text-[#1a56db]" />
          Pacientes agendados para essa semana
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
              allowDecimals={false}
            />
            <Bar
              dataKey="total"
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

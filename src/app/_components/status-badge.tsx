import { Badge } from "@/components/ui/badge";

export const StatusBadge = () => {
  return (
    <Badge
      variant="outline"
      className="border-emerald-200 bg-emerald-50 text-emerald-700 font-normal"
    >
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block" />
      Confirmado
    </Badge>
  );
};

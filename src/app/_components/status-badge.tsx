interface StatusBadgeProps {
  status?: "Confirmado" | "Finalizado";
}

export const StatusBadge = ({ status = "Confirmado" }: StatusBadgeProps) => {
  const statusConfig = {
    Confirmado: {
      text: "text-emerald-600",
      bg: "bg-emerald-100",
      dot: "bg-emerald-600",
    },
    Finalizado: {
      text: "text-gray-500",
      bg: "bg-gray-100",
      dot: "bg-gray-400",
    },
  };

  const config = statusConfig[status] ?? statusConfig["Confirmado"];

  return (
    <div
      className={`flex items-center gap-2 px-2 py-0.5 rounded-full w-fit ${config.bg}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      <span className={`text-xs font-medium ${config.text}`}>{status}</span>
    </div>
  );
};

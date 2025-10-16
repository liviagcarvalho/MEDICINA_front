import { Badge } from "@/components/ui/badge";

interface PriorityBadgeProps {
  priority: "BAIXA" | "MEDIA" | "ALTA" | "URGENTE";
}

const priorityConfig = {
  BAIXA: { label: "Baixa", className: "bg-priority-baixa text-white" },
  MEDIA: { label: "Média", className: "bg-priority-media text-white" },
  ALTA: { label: "Alta", className: "bg-priority-alta text-white" },
  URGENTE: { label: "Urgente", className: "bg-priority-urgente text-white" },
};

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const config = priorityConfig[priority];
  return <Badge className={config.className}>{config.label}</Badge>;
}

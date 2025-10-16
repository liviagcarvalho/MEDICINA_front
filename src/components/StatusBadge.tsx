import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: "RASCUNHO" | "EM_REVISAO" | "APROVADA" | "ARQUIVADA";
}

const statusConfig = {
  RASCUNHO: { label: "Rascunho", className: "bg-status-rascunho text-white" },
  EM_REVISAO: { label: "Em Revisão", className: "bg-status-revisao text-white" },
  APROVADA: { label: "Aprovada", className: "bg-status-aprovada text-white" },
  ARQUIVADA: { label: "Arquivada", className: "bg-status-arquivada text-white" },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  return <Badge className={config.className}>{config.label}</Badge>;
}

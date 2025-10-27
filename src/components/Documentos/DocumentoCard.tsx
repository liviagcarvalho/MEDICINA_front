import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Eye, AlertCircle } from "lucide-react";
import { Documento } from "@/types/documentos";
import { StatusBadge } from "@/components/StatusBadge";
import { format, differenceInDays } from "date-fns";
import { ptBR } from "date-fns/locale";

interface DocumentoCardProps {
  documento: Documento;
  onVerDetalhes: (id: string) => void;
  onBaixar: (id: string) => void;
}

export function DocumentoCard({ documento, onVerDetalhes, onBaixar }: DocumentoCardProps) {
  const versaoAtual = documento.versoes_documento?.[0];
  const podeDownload = versaoAtual?.status === "APROVADA" && versaoAtual?.link_arquivo;

  const dataVencimento = new Date(documento.data_vencimento);
  const hoje = new Date();
  const diasParaVencer = differenceInDays(dataVencimento, hoje);
  const isVencido = diasParaVencer < 0;
  const isProximoVencimento = diasParaVencer >= 0 && diasParaVencer <= 30;

  const palavrasChave = documento.documentos_palavras_chave?.map((dpc) => dpc.palavras_chave.termo) || [];

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-primary-dark">{documento.titulo}</h3>
            <p className="text-sm text-muted-foreground">
              {documento.tipos_documento?.nome} • {documento.areas?.nome} • {documento.unidades?.nome}
            </p>
          </div>
          {versaoAtual && <StatusBadge status={versaoAtual.status} />}
        </div>

        {palavrasChave.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {palavrasChave.map((termo, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {termo}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between text-sm">
          <div className="space-y-1">
            <p className="text-muted-foreground">
              Início: {format(new Date(documento.data_inicio), "dd/MM/yyyy", { locale: ptBR })}
            </p>
            <p className={isVencido ? "text-destructive font-medium" : "text-muted-foreground"}>
              Vencimento: {format(dataVencimento, "dd/MM/yyyy", { locale: ptBR })}
            </p>
          </div>

          {(isVencido || isProximoVencimento) && (
            <div className="flex items-center gap-1 text-xs">
              <AlertCircle className={`h-4 w-4 ${isVencido ? "text-destructive" : "text-warning"}`} />
              <span className={isVencido ? "text-destructive font-medium" : "text-warning"}>
                {isVencido ? "Vencido" : `Vence em ${diasParaVencer} dias`}
              </span>
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={() => onVerDetalhes(documento.id)} className="flex-1">
            <Eye className="h-4 w-4 mr-2" />
            Ver detalhes
          </Button>
          {podeDownload && (
            <Button size="sm" onClick={() => onBaixar(documento.id)} className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Baixar
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

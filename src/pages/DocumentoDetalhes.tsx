import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/Layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/StatusBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { Documento, VersaoDocumento } from "@/types/documentos";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Download, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function DocumentoDetalhes() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [documento, setDocumento] = useState<Documento | null>(null);
  const [versoes, setVersoes] = useState<VersaoDocumento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchDocumento();
      fetchVersoes();
    }
  }, [id]);

  const fetchDocumento = async () => {
    try {
      const { data, error } = await supabase
        .from("documentos")
        .select(`
          *,
          areas (nome),
          unidades (nome),
          tipos_documento (nome),
          documentos_palavras_chave (
            palavras_chave (termo)
          ),
          versoes_documento!versoes_documento_documento_id_fkey (
            id,
            status,
            link_arquivo
          )
        `)
        .eq("id", id!)
        .single();

      if (error) throw error;
      setDocumento(data);
    } catch (error: any) {
      console.error("Erro ao buscar documento:", error);
      toast({
        title: "Erro ao buscar documento",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchVersoes = async () => {
    try {
      const { data, error } = await supabase
        .from("versoes_documento")
        .select(`
          *,
          profiles_elaborador:profiles!versoes_documento_elaborador_id_fkey (nome_completo),
          profiles_revisor:profiles!versoes_documento_revisor_id_fkey (nome_completo),
          profiles_aprovador:profiles!versoes_documento_aprovador_id_fkey (nome_completo)
        `)
        .eq("documento_id", id!)
        .order("numero_versao", { ascending: false });

      if (error) throw error;
      setVersoes(data || []);
    } catch (error: any) {
      console.error("Erro ao buscar versões:", error);
    }
  };

  const handleDownload = async (link: string, versao: number) => {
    try {
      window.open(link, "_blank");
      toast({
        title: "Download iniciado",
        description: `Baixando versão ${versao}`,
      });
    } catch (error: any) {
      toast({
        title: "Erro ao baixar",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </MainLayout>
    );
  }

  if (!documento) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Documento não encontrado</p>
          <Button className="mt-4" onClick={() => navigate("/documentos")}>
            Voltar para documentos
          </Button>
        </div>
      </MainLayout>
    );
  }

  const versaoAtual = versoes[0];
  const podeDownload = versaoAtual?.status === "APROVADA" && versaoAtual?.link_arquivo;
  const palavrasChave = documento.documentos_palavras_chave?.map((dpc) => dpc.palavras_chave.termo) || [];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/documentos")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-primary-dark">{documento.titulo}</h1>
            <p className="text-muted-foreground">
              {documento.tipos_documento?.nome} • {documento.areas?.nome} • {documento.unidades?.nome}
            </p>
          </div>
          {podeDownload && (
            <Button onClick={() => handleDownload(versaoAtual.link_arquivo!, versaoAtual.numero_versao)}>
              <Download className="h-4 w-4 mr-2" />
              Baixar versão atual
            </Button>
          )}
        </div>

        <Card className="p-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Informações Gerais</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Data de início:</span>{" "}
                  <span className="font-medium">
                    {format(new Date(documento.data_inicio), "dd/MM/yyyy", { locale: ptBR })}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Data de vencimento:</span>{" "}
                  <span className="font-medium">
                    {format(new Date(documento.data_vencimento), "dd/MM/yyyy", { locale: ptBR })}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Status atual:</span>{" "}
                  {versaoAtual && <StatusBadge status={versaoAtual.status} />}
                </div>
              </div>
            </div>

            {palavrasChave.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Palavras-chave</h3>
                <div className="flex flex-wrap gap-2">
                  {palavrasChave.map((termo, idx) => (
                    <Badge key={idx} variant="outline">
                      {termo}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>

        <div>
          <h2 className="text-2xl font-bold text-primary-dark mb-4">Histórico de Versões</h2>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Versão</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Elaborador</TableHead>
                  <TableHead>Revisor</TableHead>
                  <TableHead>Aprovador</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {versoes.map((versao) => (
                  <TableRow key={versao.id}>
                    <TableCell className="font-medium">v{versao.numero_versao}</TableCell>
                    <TableCell>
                      <StatusBadge status={versao.status} />
                    </TableCell>
                    <TableCell>{versao.profiles_elaborador?.nome_completo || "-"}</TableCell>
                    <TableCell>{versao.profiles_revisor?.nome_completo || "-"}</TableCell>
                    <TableCell>{versao.profiles_aprovador?.nome_completo || "-"}</TableCell>
                    <TableCell>
                      {format(new Date(versao.created_at), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                    </TableCell>
                    <TableCell>
                      {versao.status === "APROVADA" && versao.link_arquivo && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDownload(versao.link_arquivo!, versao.numero_versao)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}

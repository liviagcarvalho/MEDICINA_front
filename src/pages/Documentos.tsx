import { useEffect, useState } from "react";
import { MainLayout } from "@/components/Layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { DocumentoFiltrosComponent } from "@/components/Documentos/DocumentoFiltros";
import { DocumentoCard } from "@/components/Documentos/DocumentoCard";
import { DocumentoForm } from "@/components/Documentos/DocumentoForm";
import {
  Documento,
  Area,
  Unidade,
  TipoDocumento,
  PalavraChave,
  DocumentoFiltros,
} from "@/types/documentos";

export default function Documentos() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [unidades, setUnidades] = useState<Unidade[]>([]);
  const [tipos, setTipos] = useState<TipoDocumento[]>([]);
  const [palavrasChave, setPalavrasChave] = useState<PalavraChave[]>([]);
  const [filtros, setFiltros] = useState<DocumentoFiltros>({});
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    fetchDocumentos();
  }, [filtros]);

  const fetchInitialData = async () => {
    try {
      const [areasRes, unidadesRes, tiposRes, pcRes] = await Promise.all([
        supabase.from("areas").select("*").eq("ativa", true).order("nome"),
        supabase.from("unidades").select("*").eq("ativa", true).order("nome"),
        supabase.from("tipos_documento").select("*").eq("ativo", true).order("nome"),
        supabase.from("palavras_chave").select("*").eq("ativa", true).order("termo"),
      ]);

      if (areasRes.error) throw areasRes.error;
      if (unidadesRes.error) throw unidadesRes.error;
      if (tiposRes.error) throw tiposRes.error;
      if (pcRes.error) throw pcRes.error;

      setAreas(areasRes.data || []);
      setUnidades(unidadesRes.data || []);
      setTipos(tiposRes.data || []);
      setPalavrasChave(pcRes.data || []);
    } catch (error: any) {
      console.error("Erro ao buscar dados iniciais:", error);
      toast({
        title: "Erro ao carregar dados",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const fetchDocumentos = async () => {
    setLoading(true);
    try {
      let query = supabase
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
        .order("created_at", { ascending: false });

      if (filtros.busca) {
        query = query.or(`titulo.ilike.%${filtros.busca}%`);
      }

      if (filtros.area_id) {
        query = query.eq("area_id", filtros.area_id);
      }

      if (filtros.unidade_id) {
        query = query.eq("unidade_id", filtros.unidade_id);
      }

      const { data, error } = await query;

      if (error) throw error;

      let filteredData = data || [];

      // Filtrar por palavras-chave no client-side
      if (filtros.palavras_chave && filtros.palavras_chave.length > 0) {
        filteredData = filteredData.filter((doc) => {
          const docPalavrasChave =
            doc.documentos_palavras_chave?.map((dpc: any) => dpc.palavras_chave.id) || [];
          return filtros.palavras_chave!.some((pcId) => docPalavrasChave.includes(pcId));
        });
      }

      setDocumentos(filteredData);
    } catch (error: any) {
      console.error("Erro ao buscar documentos:", error);
      toast({
        title: "Erro ao buscar documentos",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerDetalhes = (id: string) => {
    navigate(`/documentos/${id}`);
  };

  const handleBaixar = async (id: string) => {
    const documento = documentos.find((d) => d.id === id);
    if (!documento) return;

    const versaoAtual = documento.versoes_documento?.[0];
    if (versaoAtual?.link_arquivo) {
      window.open(versaoAtual.link_arquivo, "_blank");
      toast({
        title: "Download iniciado",
        description: `Baixando ${documento.titulo}`,
      });
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary-dark">Documentos</h1>
            <p className="text-muted-foreground">Gerencie todos os documentos do sistema</p>
          </div>
          <Button onClick={() => setFormOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Documento
          </Button>
        </div>

        <DocumentoFiltrosComponent
          filtros={filtros}
          onFiltrosChange={setFiltros}
          areas={areas}
          unidades={unidades}
          palavrasChave={palavrasChave}
          isLoading={loading}
        />

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : documentos.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>Nenhum documento encontrado</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documentos.map((documento) => (
              <DocumentoCard
                key={documento.id}
                documento={documento}
                onVerDetalhes={handleVerDetalhes}
                onBaixar={handleBaixar}
              />
            ))}
          </div>
        )}
      </div>

      <DocumentoForm
        open={formOpen}
        onOpenChange={setFormOpen}
        areas={areas}
        unidades={unidades}
        tipos={tipos}
        palavrasChave={palavrasChave}
        onSuccess={fetchDocumentos}
      />
    </MainLayout>
  );
}

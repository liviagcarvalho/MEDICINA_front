import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Area, Unidade, TipoDocumento, PalavraChave, NovoDocumentoData } from "@/types/documentos";
import { Loader2, Upload, X } from "lucide-react";

interface DocumentoFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  areas: Area[];
  unidades: Unidade[];
  tipos: TipoDocumento[];
  palavrasChave: PalavraChave[];
  onSuccess: () => void;
}

export function DocumentoForm({
  open,
  onOpenChange,
  areas,
  unidades,
  tipos,
  palavrasChave,
  onSuccess,
}: DocumentoFormProps) {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const [formData, setFormData] = useState<Partial<NovoDocumentoData>>({
    palavras_chave: [],
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handlePalavraChaveToggle = (id: string) => {
    const current = formData.palavras_chave || [];
    const updated = current.includes(id) ? current.filter((pcId) => pcId !== id) : [...current, id];
    setFormData({ ...formData, palavras_chave: updated });
  };

  const handleStep1Next = () => {
    if (!formData.titulo || !formData.area_id || !formData.unidade_id || !formData.tipo_id || !formData.data_inicio || !formData.data_vencimento) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }
    setStep(2);
  };

  const handleSubmit = async () => {
    if (!file) {
      toast({
        title: "Arquivo obrigatório",
        description: "Selecione um arquivo para a versão inicial",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      // 1. Criar documento
      const { data: documento, error: docError } = await supabase
        .from("documentos")
        .insert({
          titulo: formData.titulo!,
          area_id: formData.area_id!,
          unidade_id: formData.unidade_id!,
          tipo_id: formData.tipo_id!,
          data_inicio: formData.data_inicio!,
          data_vencimento: formData.data_vencimento!,
          autor_id: user.id,
        })
        .select()
        .single();

      if (docError) throw docError;

      // 2. Upload do arquivo
      const fileExt = file.name.split(".").pop();
      const fileName = `${documento.id}_v1.${fileExt}`;
      const filePath = `${documento.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("documentos")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("documentos")
        .getPublicUrl(filePath);

      // 3. Criar versão inicial
      const { data: versao, error: versaoError } = await supabase
        .from("versoes_documento")
        .insert({
          documento_id: documento.id,
          numero_versao: 1,
          link_arquivo: publicUrl,
          elaborador_id: user.id,
          status: "RASCUNHO",
          observacoes: formData.observacoes,
        })
        .select()
        .single();

      if (versaoError) throw versaoError;

      // 4. Atualizar versão atual no documento
      const { error: updateError } = await supabase
        .from("documentos")
        .update({ versao_atual_id: versao.id })
        .eq("id", documento.id);

      if (updateError) throw updateError;

      // 5. Vincular palavras-chave
      if (formData.palavras_chave && formData.palavras_chave.length > 0) {
        const palavrasChaveData = formData.palavras_chave.map((pc_id) => ({
          documento_id: documento.id,
          palavra_chave_id: pc_id,
        }));

        const { error: pcError } = await supabase
          .from("documentos_palavras_chave")
          .insert(palavrasChaveData);

        if (pcError) throw pcError;
      }

      toast({
        title: "Documento criado",
        description: "O documento foi criado com sucesso",
      });

      onSuccess();
      handleClose();
    } catch (error: any) {
      console.error("Erro ao criar documento:", error);
      toast({
        title: "Erro ao criar documento",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setFormData({ palavras_chave: [] });
    setFile(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Novo Documento - Passo {step} de 2
          </DialogTitle>
        </DialogHeader>

        {step === 1 ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="titulo">Título *</Label>
              <Input
                id="titulo"
                value={formData.titulo || ""}
                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                placeholder="Digite o título do documento"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="area">Área *</Label>
                <Select value={formData.area_id} onValueChange={(value) => setFormData({ ...formData, area_id: value })}>
                  <SelectTrigger id="area">
                    <SelectValue placeholder="Selecione a área" />
                  </SelectTrigger>
                  <SelectContent>
                    {areas.map((area) => (
                      <SelectItem key={area.id} value={area.id}>
                        {area.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="unidade">Unidade *</Label>
                <Select value={formData.unidade_id} onValueChange={(value) => setFormData({ ...formData, unidade_id: value })}>
                  <SelectTrigger id="unidade">
                    <SelectValue placeholder="Selecione a unidade" />
                  </SelectTrigger>
                  <SelectContent>
                    {unidades.map((unidade) => (
                      <SelectItem key={unidade.id} value={unidade.id}>
                        {unidade.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo de Documento *</Label>
              <Select value={formData.tipo_id} onValueChange={(value) => setFormData({ ...formData, tipo_id: value })}>
                <SelectTrigger id="tipo">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {tipos.map((tipo) => (
                    <SelectItem key={tipo.id} value={tipo.id}>
                      {tipo.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="data_inicio">Data de Início *</Label>
                <Input
                  id="data_inicio"
                  type="date"
                  value={formData.data_inicio || ""}
                  onChange={(e) => setFormData({ ...formData, data_inicio: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="data_vencimento">Data de Vencimento *</Label>
                <Input
                  id="data_vencimento"
                  type="date"
                  value={formData.data_vencimento || ""}
                  onChange={(e) => setFormData({ ...formData, data_vencimento: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleClose}>
                Cancelar
              </Button>
              <Button onClick={handleStep1Next}>
                Próximo
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="file">Arquivo *</Label>
              <div className="border-2 border-dashed border-input rounded-md p-6 text-center">
                <input
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.xls,.xlsx"
                />
                <Label htmlFor="file" className="cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  {file ? (
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-sm">{file.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          setFile(null);
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Clique para selecionar um arquivo
                    </p>
                  )}
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea
                id="observacoes"
                value={formData.observacoes || ""}
                onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                placeholder="Digite observações sobre a versão inicial"
                rows={3}
              />
            </div>

            {palavrasChave.length > 0 && (
              <div className="space-y-2">
                <Label>Palavras-chave</Label>
                <div className="flex flex-wrap gap-2">
                  {palavrasChave.map((pc) => {
                    const isSelected = formData.palavras_chave?.includes(pc.id);
                    return (
                      <Badge
                        key={pc.id}
                        variant={isSelected ? "default" : "outline"}
                        className="cursor-pointer hover:opacity-80"
                        onClick={() => handlePalavraChaveToggle(pc.id)}
                      >
                        {pc.termo}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setStep(1)} disabled={loading}>
                Voltar
              </Button>
              <Button onClick={handleSubmit} disabled={loading}>
                {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Criar Documento
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

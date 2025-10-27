import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, X } from "lucide-react";
import { Area, Unidade, PalavraChave, DocumentoFiltros } from "@/types/documentos";
import { Badge } from "@/components/ui/badge";

interface DocumentoFiltrosProps {
  filtros: DocumentoFiltros;
  onFiltrosChange: (filtros: DocumentoFiltros) => void;
  areas: Area[];
  unidades: Unidade[];
  palavrasChave: PalavraChave[];
  isLoading?: boolean;
}

export function DocumentoFiltrosComponent({
  filtros,
  onFiltrosChange,
  areas,
  unidades,
  palavrasChave,
  isLoading,
}: DocumentoFiltrosProps) {
  const handleBuscaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltrosChange({ ...filtros, busca: e.target.value });
  };

  const handleAreaChange = (value: string) => {
    onFiltrosChange({ ...filtros, area_id: value === "todos" ? undefined : value });
  };

  const handleUnidadeChange = (value: string) => {
    onFiltrosChange({ ...filtros, unidade_id: value === "todos" ? undefined : value });
  };

  const handlePalavraChaveToggle = (id: string) => {
    const current = filtros.palavras_chave || [];
    const updated = current.includes(id)
      ? current.filter((pcId) => pcId !== id)
      : [...current, id];
    onFiltrosChange({ ...filtros, palavras_chave: updated });
  };

  const handleLimparFiltros = () => {
    onFiltrosChange({});
  };

  const temFiltrosAtivos =
    filtros.busca || filtros.area_id || filtros.unidade_id || (filtros.palavras_chave && filtros.palavras_chave.length > 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por título..."
            value={filtros.busca || ""}
            onChange={handleBuscaChange}
            className="pl-10"
            disabled={isLoading}
          />
        </div>

        <Select value={filtros.area_id || "todos"} onValueChange={handleAreaChange} disabled={isLoading}>
          <SelectTrigger>
            <SelectValue placeholder="Todas as áreas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todas as áreas</SelectItem>
            {areas.map((area) => (
              <SelectItem key={area.id} value={area.id}>
                {area.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filtros.unidade_id || "todos"} onValueChange={handleUnidadeChange} disabled={isLoading}>
          <SelectTrigger>
            <SelectValue placeholder="Todas as unidades" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todas as unidades</SelectItem>
            {unidades.map((unidade) => (
              <SelectItem key={unidade.id} value={unidade.id}>
                {unidade.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {palavrasChave.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Palavras-chave:</label>
          <div className="flex flex-wrap gap-2">
            {palavrasChave.map((pc) => {
              const isSelected = filtros.palavras_chave?.includes(pc.id);
              return (
                <Badge
                  key={pc.id}
                  variant={isSelected ? "default" : "outline"}
                  className="cursor-pointer hover:opacity-80"
                  onClick={() => !isLoading && handlePalavraChaveToggle(pc.id)}
                >
                  {pc.termo}
                </Badge>
              );
            })}
          </div>
        </div>
      )}

      {temFiltrosAtivos && (
        <div className="flex justify-end">
          <Button variant="ghost" size="sm" onClick={handleLimparFiltros} disabled={isLoading}>
            <X className="h-4 w-4 mr-2" />
            Limpar filtros
          </Button>
        </div>
      )}
    </div>
  );
}

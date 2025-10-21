import { MainLayout } from "@/components/Layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Documentos() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary-dark">Documentos</h1>
            <p className="text-muted-foreground">Gerencie todos os documentos do sistema</p>
          </div>
          <Button onClick={() => navigate("/documentos/novo")}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Documento
          </Button>
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar documentos..." className="pl-10" />
          </div>
          <Button variant="outline">Filtros</Button>
        </div>

        <div className="text-center py-12 text-muted-foreground">
          <p>Em breve: Lista de documentos com filtros e pesquisa</p>
        </div>
      </div>
    </MainLayout>
  );
}

import { MainLayout } from "@/components/Layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, AlertCircle, Clock, CheckCircle2, FileCheck, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-primary-dark">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral do sistema de gestão documental</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Gestão de Documentos */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Gestão de Documentos
                  </CardTitle>
                  <CardDescription>Status dos documentos do sistema</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-warning" />
                    <span className="text-sm text-muted-foreground">Próximos do Vencimento</span>
                  </div>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    <span className="text-sm text-muted-foreground">Vencidos</span>
                  </div>
                  <p className="text-2xl font-bold">5</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <FileCheck className="h-4 w-4 text-info" />
                    <span className="text-sm text-muted-foreground">Em Revisão</span>
                  </div>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span className="text-sm text-muted-foreground">Aprovados</span>
                  </div>
                  <p className="text-2xl font-bold">145</p>
                </div>
              </div>
              <Button className="w-full" onClick={() => navigate("/documentos")}>
                Ver Documentos
              </Button>
            </CardContent>
          </Card>

          {/* Ocorrências */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-primary" />
                    Ocorrências
                  </CardTitle>
                  <CardDescription>Acompanhamento de ocorrências</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-info" />
                    <span className="text-sm text-muted-foreground">Abertas</span>
                  </div>
                  <p className="text-2xl font-bold">18</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-warning" />
                    <span className="text-sm text-muted-foreground">Em Andamento</span>
                  </div>
                  <p className="text-2xl font-bold">7</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span className="text-sm text-muted-foreground">Concluídas</span>
                  </div>
                  <p className="text-2xl font-bold">92</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    <span className="text-sm text-muted-foreground">Urgentes</span>
                  </div>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </div>
              <Button className="w-full" onClick={() => navigate("/ocorrencias")}>
                Ver Ocorrências
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Atividades Recentes */}
        <Card>
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
            <CardDescription>Últimas atualizações no sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-4 pb-4 border-b last:border-0">
                  <div className="w-2 h-2 mt-2 rounded-full bg-primary" />
                  <div className="flex-1">
                    <p className="font-medium">Documento POP-{i.toString().padStart(3, "0")} atualizado</p>
                    <p className="text-sm text-muted-foreground">Nova versão enviada para revisão</p>
                    <p className="text-xs text-muted-foreground mt-1">Há {i} hora(s)</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}

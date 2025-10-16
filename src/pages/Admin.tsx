import { MainLayout } from "@/components/Layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building, FileType, Tags } from "lucide-react";

export default function Admin() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Administração</h1>
          <p className="text-muted-foreground">Configurações e gerenciamento do sistema</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Usuários
              </CardTitle>
              <CardDescription>Gerenciar usuários e permissões</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Em breve</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-primary" />
                Áreas e Unidades
              </CardTitle>
              <CardDescription>Gerenciar estrutura organizacional</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Em breve</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileType className="h-5 w-5 text-primary" />
                Tipos de Documento
              </CardTitle>
              <CardDescription>Configurar tipos de documento</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Em breve</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tags className="h-5 w-5 text-primary" />
                Palavras-Chave
              </CardTitle>
              <CardDescription>Gerenciar palavras-chave</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Em breve</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}

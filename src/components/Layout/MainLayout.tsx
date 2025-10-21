import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1">
          <div className="border-b bg-background sticky top-0 z-10">
            <div className="flex h-16 items-center px-4 gap-4">
              <SidebarTrigger />
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-primary-dark">Sistema de Gestão Documental</h2>
              </div>
            </div>
          </div>
          <div className="p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}

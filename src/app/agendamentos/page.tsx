import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AppointmentsTable } from "./_components/appointments-table";

export const AppointmentsPage = () => {
  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/painel">Menu Principal</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Agendamentos</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              Agendamentos
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Access a detailed overview of key metrics and patient outcomes
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Agendar consulta
          </Button>
        </div>
        <AppointmentsTable />
      </div>
    </div>
  );
};

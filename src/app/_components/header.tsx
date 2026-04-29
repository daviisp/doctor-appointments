import { ChevronDown, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface HeaderProps {
  title: string;
  subTitle: string;
  description: string;
}

export const Header = ({ title, subTitle, description }: HeaderProps) => {
  return (
    <div className="space-y-4">
      <Breadcrumb className="hidden md:block">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/painel"
              className="text-muted-foreground text-sm"
            >
              Menu Principal
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-[#1a56db] font-medium text-sm">
              {title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="pt-10 lg:pt-0">
          <h1 className="text-2xl font-bold tracking-tight pt-3 lg:pt-0">
            {subTitle}
          </h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
};

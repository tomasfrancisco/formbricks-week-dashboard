import { Pencil } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { Input } from "@/components/ui/input";

export function DashboardBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboards">Dashboards</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem className="flex items-center gap-1.5">
          <div className="flex items-center gap-1.5 group">
            <Input
              type="text"
              defaultValue="Sales Dashboard"
              className="h-auto w-[200px] border-none bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0 [&:not(:focus)]:hover:bg-muted/50"
            />
            <Pencil className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100" />
          </div>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

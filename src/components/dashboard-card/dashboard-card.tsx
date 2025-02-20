import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { MoreHorizontal, LayoutDashboard } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface DashboardCardProps {
  title: string;
  description: string;
  createdBy: string;
  lastUpdatedAt: string;
  onDelete: () => void;
  href: string;
}

export function DashboardCard({
  description,
  title,
  createdBy,
  lastUpdatedAt,
  onDelete,
  href,
}: DashboardCardProps) {
  return (
    <Link href={href}>
      <Card className="relative">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted/50">
                <LayoutDashboard className="h-5 w-5 text-muted-foreground" />
              </div>
              <CardTitle className="truncate">{title}</CardTitle>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-4"
                >
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {/* <DropdownMenuItem asChild>
                <Link href={`/dashboard/${dashboard.id}`}>View Dashboard</Link>
              </DropdownMenuItem> */}
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={onDelete}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <CardDescription className="mt-2">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <span>Created by </span>
              <span className="font-medium text-foreground">{createdBy}</span>
            </div>
            <div>
              Last updated{" "}
              {new Date(lastUpdatedAt).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

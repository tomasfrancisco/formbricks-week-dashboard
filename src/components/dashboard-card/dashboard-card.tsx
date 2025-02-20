import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDistance } from "date-fns";

import { MoreVertical, Trash } from "lucide-react";
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
    <Link href={href} className="group">
      <Card className="relative group-hover:bg-secondary">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CardTitle className="truncate group-hover:underline">
                {title}
              </CardTitle>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-4"
                >
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onDelete}>
                  <Trash className="text-current" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <CardDescription className="mt-2">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm text-muted-foreground gap-4 leading-normal">
            <div className="flex items-center gap-1">
              <span>Created by </span>
              <span className="font-bold">{createdBy}</span>
            </div>
            <div>
              Updated{" "}
              {formatDistance(new Date(lastUpdatedAt), new Date(), {
                addSuffix: true,
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

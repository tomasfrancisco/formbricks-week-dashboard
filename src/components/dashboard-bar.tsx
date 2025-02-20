import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { DashboardBreadcrumb } from "./dashboard-breadcrumb";
import { Separator } from "./ui/separator";
import { ReactNode } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { DatePickerRange } from "@/components/date-picker-range/date-picker-range";
import Link from "next/link";
import { AddChartButton } from "@/modules/add-chart-button";

interface DashboardBarProps {
  /**
   * Additional actions to display on the right side of the page bar.
   */
  actions?: ReactNode[];
}

export function DashboardBar({ actions = [] }: DashboardBarProps) {
  return (
    <div className="flex flex-col gap-6  px-6">
      <div className="flex flex-col">
        <div className="flex space-between items-center mb-2">
          <div className="flex gap-7 items-center w-full">
            <Button variant="secondary" asChild>
              <Link href="/">
                <ArrowLeft /> Back
              </Link>
            </Button>
            <DashboardBreadcrumb />
          </div>
          <div className="flex items-center">
            {/* Actions */}
            <AddChartButton onAdd={() => {}} />
            {...actions}
          </div>
        </div>
        <Separator />
      </div>
      <div className="flex justify-between gap-2">
        <div className="flex gap-2">
          <Input placeholder="Search by dashboard name" />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Created by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="user-1">User 1</SelectItem>
                <SelectItem value="user-2">User 2</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <DatePickerRange />
      </div>
    </div>
  );
}

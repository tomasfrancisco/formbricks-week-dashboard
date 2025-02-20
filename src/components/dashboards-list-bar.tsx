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
import { NewDashboardButton } from "@/modules/new-dashboard-button/new-dashboard-button";

interface DashboardsListBarProps {
  /**
   * Additional actions to display on the right side of the page bar.
   */
  actions?: ReactNode[];
}

export function DashboardsListBar({ actions = [] }: DashboardsListBarProps) {
  return (
    <div className="flex flex-col gap-6  px-6">
      <div className="flex flex-col">
        <div className="flex space-between items-center mb-2">
          <div className="flex gap-7 items-center w-full">
            <h1 className="text-3xl leading-normal font-bold">Dashboards</h1>
          </div>
          <div className="flex items-center">
            {/* Actions */}
            <NewDashboardButton onCreate={() => {}} />
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
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="last-updated">Last updated</SelectItem>
              <SelectItem value="last-created">Last created</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

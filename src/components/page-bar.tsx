import { ArrowLeft, PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { DashboardBreadcrumb } from "./dashboard-breadcrumb";
import { Separator } from "./ui/separator";
import { ReactNode } from "react";

interface PageBarProps {
  /**
   * Additional actions to display on the right side of the page bar.
   */
  actions?: ReactNode[];
}

export function PageBar({ actions = [] }: PageBarProps) {
  return (
    <div className="flex px-6 flex-col">
      <div className="flex space-between items-center mb-2">
        <div className="flex gap-7 items-center w-full">
          <Button variant="secondary">
            <ArrowLeft /> Back
          </Button>
          <DashboardBreadcrumb />
        </div>
        <div className="flex items-center">
          {/* Actions */}
          <Button>
            Add Chart <PlusIcon />
          </Button>
          {...actions}
        </div>
      </div>
      <Separator />
    </div>
  );
}

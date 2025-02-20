import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { DashboardBreadcrumb } from './dashboard-breadcrumb';
import { Separator } from './ui/separator';
import { ReactNode } from 'react';

import { Input } from './ui/input';
import { DatePickerRange } from '@/components/date-picker-range/date-picker-range';
import Link from 'next/link';
import { AddChartButton } from '@/modules/add-chart-button';

interface DashboardBarProps {
  /**
   * Additional actions to display on the right side of the page bar.
   */
  actions?: ReactNode[];
}

export function DashboardBar({ actions = [] }: DashboardBarProps) {
  return (
    <div className="flex flex-col gap-6 px-6">
      <div className="flex flex-col">
        <div className="space-between mb-2 flex items-center">
          <div className="flex w-full items-center gap-7">
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
          <Input placeholder="Search by chart name" />
        </div>
        <DatePickerRange />
      </div>
    </div>
  );
}

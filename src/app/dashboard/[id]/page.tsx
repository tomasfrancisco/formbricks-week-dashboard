'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { CopyPlus, MoreVertical, SquarePen, Trash } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BarChart, LineChart, PieChart } from '@/components/charts';

interface Chart {
  id: string;
  name: string;
  type: 'bar' | 'pie' | 'distribution';
  dataSource: string | string[];
}

export default function DashboardPage() {
  const [charts, setCharts] = useState<Chart[]>([
    {
      id: '1',
      name: 'User Roles Distribution',
      type: 'pie',
      dataSource: 'q1',
    },
    {
      id: '2',
      name: 'Feature Usage',
      type: 'bar',
      dataSource: 'q3',
    },
    {
      id: '3',
      name: 'Satisfaction Trends',
      type: 'distribution',
      dataSource: ['s1', 's2'],
    },
  ]);

  const deleteChart = (id: string) => {
    setCharts(charts.filter((chart) => chart.id !== id));
  };

  const duplicateChart = (chart: Chart) => {
    setCharts([
      ...charts,
      {
        ...chart,
        id: Math.random().toString(),
        name: `${chart.name} (Copy)`,
      },
    ]);
  };

  const renderChart = (chart: Chart) => {
    switch (chart.type) {
      case 'bar':
        return <BarChart className="h-[300px] w-full" />;
      case 'distribution':
        return <LineChart className="h-[300px] w-full" />;
      case 'pie':
        return <PieChart className="h-[300px] w-full" />;
      default:
        return null;
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {charts.map((chart) => (
        <Card key={chart.id} className="relative h-[400px]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CardTitle className="truncate group-hover:underline">
                  {chart.name}
                </CardTitle>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute top-4 right-4"
                  >
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => {}}>
                    <SquarePen className="text-current" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => duplicateChart(chart)}>
                    <CopyPlus className="text-current" /> Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => deleteChart(chart.id)}>
                    <Trash className="text-current" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">{renderChart(chart)}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

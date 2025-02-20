"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BarChart, LineChart, PieChart } from "@/components/charts";

interface Chart {
  id: string;
  name: string;
  type: "bar" | "pie" | "distribution";
  dataSource: string | string[];
}

// Mock data for multiple choice questions
const multipleChoiceQuestions = [
  {
    id: "q1",
    question: "What is your role?",
    surveyName: "User Onboarding",
  },
  {
    id: "q2",
    question: "How satisfied are you with the product?",
    surveyName: "Customer Satisfaction",
  },
  {
    id: "q3",
    question: "Which feature do you use most?",
    surveyName: "Feature Usage",
  },
];

// Mock data for surveys
const surveys = [
  {
    id: "s1",
    name: "User Onboarding",
  },
  {
    id: "s2",
    name: "Customer Satisfaction",
  },
  {
    id: "s3",
    name: "Feature Usage",
  },
];

export default function DashboardPage() {
  const [charts, setCharts] = useState<Chart[]>([
    {
      id: "1",
      name: "User Roles Distribution",
      type: "pie",
      dataSource: "q1",
    },
    {
      id: "2",
      name: "Feature Usage",
      type: "bar",
      dataSource: "q3",
    },
    {
      id: "3",
      name: "Satisfaction Trends",
      type: "distribution",
      dataSource: ["s1", "s2"],
    },
  ]);

  const [isAddingChart, setIsAddingChart] = useState(false);
  const [newChart, setNewChart] = useState<Partial<Chart>>({
    name: "",
    type: "bar",
    dataSource: "",
  });
  const [selectedSurveys, setSelectedSurveys] = useState<string[]>([]);
  const [openCommandMenu, setOpenCommandMenu] = useState(false);

  const addChart = () => {
    if (newChart.name && newChart.type) {
      const dataSource =
        newChart.type === "distribution"
          ? selectedSurveys
          : newChart.dataSource;
      if (dataSource) {
        setCharts([
          ...charts,
          {
            id: Math.random().toString(),
            name: newChart.name,
            type: newChart.type,
            dataSource,
          } as Chart,
        ]);
        setNewChart({ name: "", type: "bar", dataSource: "" });
        setSelectedSurveys([]);
        setIsAddingChart(false);
      }
    }
  };

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
      case "bar":
        return <BarChart className="w-full h-[300px]" />;
      case "distribution":
        return <LineChart className="w-full h-[300px]" />;
      case "pie":
        return <PieChart className="w-full h-[300px]" />;
      default:
        return null;
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {charts.map((chart) => (
        <Card key={chart.id} className="relative p-6 h-[400px]">
          <div className="absolute right-4 top-4 z-10">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => {}}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={() => duplicateChart(chart)}>
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={() => deleteChart(chart.id)}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="space-y-4 h-full">
            <h3 className="font-semibold">{chart.name}</h3>
            <div className="h-[300px]">{renderChart(chart)}</div>
          </div>
        </Card>
      ))}
    </div>
  );
}

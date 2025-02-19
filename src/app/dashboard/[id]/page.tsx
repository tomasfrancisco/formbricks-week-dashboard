"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, MoreHorizontal, BarChartIcon, PieChartIcon, LineChartIcon, Check, ChevronsUpDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { BarChart, LineChart, PieChart } from "@/components/charts"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface Chart {
  id: string
  name: string
  type: "bar" | "pie" | "distribution"
  dataSource: string | string[]
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
]

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
]

export default function DashboardPage({ params }: { params: { id: string } }) {
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
  ])

  const [isAddingChart, setIsAddingChart] = useState(false)
  const [newChart, setNewChart] = useState<Partial<Chart>>({
    name: "",
    type: "bar",
    dataSource: "",
  })
  const [selectedSurveys, setSelectedSurveys] = useState<string[]>([])
  const [openCommandMenu, setOpenCommandMenu] = useState(false)

  const addChart = () => {
    if (newChart.name && newChart.type) {
      const dataSource = newChart.type === "distribution" ? selectedSurveys : newChart.dataSource
      if (dataSource) {
        setCharts([
          ...charts,
          {
            id: Math.random().toString(),
            name: newChart.name,
            type: newChart.type,
            dataSource,
          } as Chart,
        ])
        setNewChart({ name: "", type: "bar", dataSource: "" })
        setSelectedSurveys([])
        setIsAddingChart(false)
      }
    }
  }

  const deleteChart = (id: string) => {
    setCharts(charts.filter((chart) => chart.id !== id))
  }

  const duplicateChart = (chart: Chart) => {
    setCharts([
      ...charts,
      {
        ...chart,
        id: Math.random().toString(),
        name: `${chart.name} (Copy)`,
      },
    ])
  }

  const renderChart = (chart: Chart) => {
    switch (chart.type) {
      case "bar":
        return <BarChart className="w-full h-[300px]" />
      case "distribution":
        return <LineChart className="w-full h-[300px]" />
      case "pie":
        return <PieChart className="w-full h-[300px]" />
      default:
        return null
    }
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">View and analyze your survey data</p>
        </div>
        <Dialog open={isAddingChart} onOpenChange={setIsAddingChart}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Chart
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Chart</DialogTitle>
              <DialogDescription>Configure your chart settings.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid gap-2">
                <Label htmlFor="chart-name">Chart name</Label>
                <Input
                  id="chart-name"
                  value={newChart.name}
                  onChange={(e) => setNewChart({ ...newChart, name: e.target.value })}
                  placeholder="e.g., User Ratings"
                />
              </div>
              <div className="grid gap-2">
                <Label>Chart type</Label>
                <RadioGroup
                  value={newChart.type}
                  onValueChange={(value) => {
                    setNewChart({ ...newChart, type: value as Chart["type"], dataSource: "" })
                    setSelectedSurveys([])
                  }}
                  className="grid grid-cols-3 gap-4"
                >
                  <div>
                    <RadioGroupItem value="bar" id="bar" className="peer sr-only" />
                    <Label
                      htmlFor="bar"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <BarChartIcon className="mb-3 h-6 w-6" />
                      Bar Chart
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="pie" id="pie" className="peer sr-only" />
                    <Label
                      htmlFor="pie"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <PieChartIcon className="mb-3 h-6 w-6" />
                      Pie Chart
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="distribution" id="distribution" className="peer sr-only" />
                    <Label
                      htmlFor="distribution"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <LineChartIcon className="mb-3 h-6 w-6" />
                      Distribution
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="grid gap-2">
                <Label>Data source</Label>
                {newChart.type && newChart.type !== "distribution" ? (
                  <Select
                    value={newChart.dataSource as string}
                    onValueChange={(value) => setNewChart({ ...newChart, dataSource: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a question" />
                    </SelectTrigger>
                    <SelectContent>
                      {multipleChoiceQuestions.map((q) => (
                        <SelectItem key={q.id} value={q.id}>
                          <div className="flex flex-col">
                            <span>{q.question}</span>
                            <span className="text-xs text-muted-foreground">from {q.surveyName}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : newChart.type === "distribution" ? (
                  <Popover open={openCommandMenu} onOpenChange={setOpenCommandMenu}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openCommandMenu}
                        className="w-full justify-between"
                      >
                        {selectedSurveys.length === 0 ? "Select surveys..." : `${selectedSurveys.length} selected`}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px] p-0">
                      <Command>
                        <CommandInput placeholder="Search surveys..." />
                        <CommandList>
                          <CommandEmpty>No surveys found.</CommandEmpty>
                          <CommandGroup>
                            <CommandItem
                              onSelect={() => {
                                if (selectedSurveys.length === surveys.length) {
                                  setSelectedSurveys([])
                                } else {
                                  setSelectedSurveys(surveys.map((s) => s.id))
                                }
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedSurveys.length === surveys.length ? "opacity-100" : "opacity-0",
                                )}
                              />
                              Select all
                            </CommandItem>
                            {surveys.map((survey) => (
                              <CommandItem
                                key={survey.id}
                                onSelect={() => {
                                  setSelectedSurveys((prev) =>
                                    prev.includes(survey.id)
                                      ? prev.filter((id) => id !== survey.id)
                                      : [...prev, survey.id],
                                  )
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    selectedSurveys.includes(survey.id) ? "opacity-100" : "opacity-0",
                                  )}
                                />
                                {survey.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                ) : null}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddingChart(false)}>
                Cancel
              </Button>
              <Button
                onClick={addChart}
                disabled={
                  !newChart.name ||
                  !newChart.type ||
                  (newChart.type === "distribution" ? selectedSurveys.length === 0 : !newChart.dataSource)
                }
              >
                Add Chart
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
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
                  <DropdownMenuItem onClick={() => duplicateChart(chart)}>Duplicate</DropdownMenuItem>
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
    </div>
  )
}


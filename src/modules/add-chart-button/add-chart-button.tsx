import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Plus,
  BarChartIcon,
  PieChartIcon,
  LineChartIcon,
  Check,
  ChevronsUpDown,
} from 'lucide-react';

import { RadioGroup } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { FeatureRadioButton } from '@/components/feature-radio-button';

type QuestionId = string;
type SurveyId = string;

type Question = {
  id: QuestionId;
  question: string;
  surveyName: string;
};

type Survey = {
  id: SurveyId;
  name: string;
};

const multipleChoiceQuestions = [
  {
    id: 'q1',
    question: 'What is your role?',
    surveyName: 'User Onboarding',
  },
  {
    id: 'q2',
    question: 'How satisfied are you with the product?',
    surveyName: 'Customer Satisfaction',
  },
  {
    id: 'q3',
    question: 'Which feature do you use most?',
    surveyName: 'Feature Usage',
  },
] satisfies Question[];

const surveys = [
  {
    id: 's1',
    name: 'User Onboarding',
  },
  {
    id: 's2',
    name: 'Customer Satisfaction',
  },
  {
    id: 's3',
    name: 'Feature Usage',
  },
] satisfies Survey[];

type ChartStyle = 'bar' | 'pie' | 'distribution';

type Chart =
  | {
      name: string;
      chartStyle?: 'bar' | 'pie';
      dataSource?: QuestionId;
    }
  | {
      name: string;
      chartStyle?: 'distribution';
      dataSource?: SurveyId[];
    };

interface AddChartButtonProps {
  onAdd: (chart: Chart) => void;
}
export function AddChartButton({ onAdd }: AddChartButtonProps) {
  const [chart, setChart] = useState<Chart>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const onAddHandler = useCallback(() => {
    {
      if (!chart) return;
      onAdd(chart);
    }
  }, [onAdd, chart]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
              value={chart?.name ?? ''}
              onChange={(e) => {
                setChart((prevChart) => ({
                  ...prevChart,
                  name: e.target.value,
                }));
              }}
              placeholder="e.g., User Ratings"
            />
          </div>
          <div className="grid gap-2">
            <Label>Chart style</Label>
            <RadioGroup
              value={chart?.chartStyle}
              onValueChange={(value) => {
                setChart((prevChart) => ({
                  ...prevChart,
                  chartStyle: value as ChartStyle,
                  dataSource: undefined, // Reset data source when changing chart style
                }));
              }}
              className="grid grid-cols-3 gap-4"
            >
              <FeatureRadioButton value="bar" id="bar" icon={BarChartIcon}>
                Bar
              </FeatureRadioButton>
              <FeatureRadioButton value="pie" id="pie" icon={PieChartIcon}>
                Pie
              </FeatureRadioButton>
              <FeatureRadioButton
                value="distribution"
                id="distribution"
                icon={LineChartIcon}
              >
                Distribution
              </FeatureRadioButton>
            </RadioGroup>
          </div>
          {chart?.chartStyle && (
            <div className="grid gap-2">
              <Label>Data source</Label>
              {chart?.chartStyle &&
              (chart.chartStyle === 'bar' || chart.chartStyle === 'pie') ? (
                <Select
                  value={chart.dataSource}
                  onValueChange={(value) =>
                    setChart((previousChart) => ({
                      ...previousChart,
                      dataSource: value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a question" />
                  </SelectTrigger>
                  <SelectContent>
                    {multipleChoiceQuestions.map((q) => (
                      <SelectItem key={q.id} value={q.id}>
                        <div className="flex flex-col">
                          <span>{q.question}</span>
                          <span className="text-muted-foreground text-xs">
                            from {q.surveyName}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : chart?.chartStyle === 'distribution' ? (
                <Popover open={isSelectOpen} onOpenChange={setIsSelectOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={isSelectOpen}
                      className="w-full justify-between"
                    >
                      {!chart.dataSource || chart.dataSource?.length === 0
                        ? 'Select surveys'
                        : `${chart.dataSource.length} selected`}
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
                              if (chart.dataSource?.length === surveys.length) {
                                setChart((previousChart) => ({
                                  ...previousChart,
                                  dataSource: [],
                                }));
                              } else {
                                setChart((previousChart) => ({
                                  ...previousChart,
                                  dataSource: surveys.map((s) => s.id),
                                }));
                              }
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                chart.dataSource?.length === surveys.length
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            Select all
                          </CommandItem>
                          {surveys.map((survey) => (
                            <CommandItem
                              key={survey.id}
                              onSelect={() => {
                                setChart((previousChart) => {
                                  if (
                                    previousChart?.chartStyle !== 'distribution'
                                  ) {
                                    // Ignore if chart style is not distribution
                                    return previousChart;
                                  }

                                  return {
                                    ...previousChart,
                                    dataSource:
                                      previousChart?.dataSource?.includes(
                                        survey.id
                                      )
                                        ? previousChart?.dataSource?.filter(
                                            (id) => id !== survey.id
                                          )
                                        : [
                                            ...(previousChart?.dataSource ??
                                              []),
                                            survey.id,
                                          ],
                                  };
                                });
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  chart?.dataSource?.includes(survey.id)
                                    ? 'opacity-100'
                                    : 'opacity-0'
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
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={onAddHandler}
            disabled={
              !chart?.name ||
              !chart?.chartStyle ||
              (chart.chartStyle === 'distribution'
                ? chart.dataSource?.length === 0
                : !chart.dataSource)
            }
          >
            Add Chart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

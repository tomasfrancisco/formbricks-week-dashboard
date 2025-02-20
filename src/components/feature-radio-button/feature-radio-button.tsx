import { BarChartIcon } from "lucide-react";
import { Label } from "../ui/label";
import { RadioGroupItem } from "../ui/radio-group";

export function FeatureRadioButton() {
  return (
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
  );
}

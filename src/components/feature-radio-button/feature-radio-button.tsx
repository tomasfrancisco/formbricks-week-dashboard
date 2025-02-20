import { LucideProps } from 'lucide-react';
import { Label } from '../ui/label';
import { RadioGroupItem } from '../ui/radio-group';
import { ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';
import { Slot } from '@radix-ui/react-slot';

interface FeatureRadioButtonProps {
  children: ReactNode;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
  value: string;
  id: string;
}
export function FeatureRadioButton({
  value,
  id,
  children,
  icon: Icon,
}: FeatureRadioButtonProps) {
  return (
    <div>
      <RadioGroupItem value={value} id={id} className="peer sr-only" />
      <Label
        htmlFor={id}
        className="border-muted bg-popover hover:bg-accent peer-focus-visible:shadow-ring
          peer-data-[state=checked]:border-primary
          [&:has([data-state=checked])]:border-primary flex flex-col items-center
          justify-between rounded-md border-2 p-4 peer-focus-visible:outline-2
          peer-focus-visible:outline-offset-2"
      >
        <Slot className="mb-3 h-6 w-6">
          <Icon />
        </Slot>
        {children}
      </Label>
    </div>
  );
}

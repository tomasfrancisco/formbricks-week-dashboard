import type { Meta, StoryObj } from '@storybook/react';

import { FeatureRadioButton } from './feature-radio-button';
import { RadioGroup } from '../ui/radio-group';
import { Grid2X2Icon } from 'lucide-react';

const meta = {
  title: 'Components/FeatureRadioButton',
  component: FeatureRadioButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [(Story) => <RadioGroup>{Story()}</RadioGroup>],
  args: {
    children: 'Feature',
    value: 'feature',
    id: 'feature',
    icon: Grid2X2Icon,
  },
} satisfies Meta<typeof FeatureRadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {};

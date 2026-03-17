/* eslint-disable storybook/no-renderer-packages */
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'error', 'success', 'warning', 'info', 'neutral'],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Approved',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Ready to Submit',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'Submission Failed',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Pending Review',
  },
};

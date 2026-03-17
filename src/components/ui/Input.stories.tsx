/* eslint-disable storybook/no-renderer-packages */
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'name',
    label: 'Full Name',
    placeholder: 'Enter your name',
  },
};

export const WithHint: Story = {
  args: {
    id: 'tax-id',
    label: 'Tax ID',
    placeholder: 'XX-XXXXXXX',
    hint: 'Format: XX-XXXXXXX',
  },
};

export const WithError: Story = {
  args: {
    id: 'email',
    label: 'Email Address',
    defaultValue: 'invalid-email',
    error: 'Please enter a valid email address.',
  },
};

export const Required: Story = {
  args: {
    id: 'organization',
    label: 'Organization',
    required: true,
    placeholder: 'Company Name',
  },
};

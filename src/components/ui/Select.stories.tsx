/* eslint-disable storybook/no-renderer-packages */
import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta = {
  title: 'UI/Select',
  component: Select,
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  { value: 'director', label: 'Director' },
  { value: 'chairman', label: 'Chairman' },
  { value: 'secretary', label: 'Secretary' },
  { value: 'treasurer', label: 'Treasurer' },
];

export const Default: Story = {
  args: {
    id: 'role',
    label: 'Role',
    options,
  },
};

export const WithoutLabel: Story = {
  args: {
    id: 'role-no-label',
    options,
  },
};

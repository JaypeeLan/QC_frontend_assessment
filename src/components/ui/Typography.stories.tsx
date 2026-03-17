/* eslint-disable storybook/no-renderer-packages */
import type { Meta, StoryObj } from '@storybook/react';
import { H1, H2, H3, H4, H5, Text } from './Typography';
import React from 'react';

const meta = {
  title: 'UI/Typography',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllHeadings: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <H1>Heading 1 (40px)</H1>
      <H2>Heading 2 (33px)</H2>
      <H3>Heading 3 (28px)</H3>
      <H4>Heading 4 (23px)</H4>
      <H5>Heading 5 (19px)</H5>
    </div>
  ),
};

export const BodyText: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Text>Standard paragraph text (16px). This is the default style for body content in the application.</Text>
      <Text size="small">Small text (13px). Often used for hints, metadata, and breadcrumbs.</Text>
      <Text muted>Muted text. Used for secondary information that should be less prominent.</Text>
    </div>
  ),
};

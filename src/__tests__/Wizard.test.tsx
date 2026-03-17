import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Wizard } from '@/components/wizard/Wizard';
import { useWizardStore } from '@/lib/store';
import React from 'react';

// Mock the API to avoid delays in tests
vi.mock('@/lib/api', () => ({
  submitRegistration: vi.fn().mockResolvedValue({ success: true, message: 'Success' }),
}));

describe('Wizard Component Integration', () => {
  beforeEach(() => {
    useWizardStore.getState().resetMizard();
  });

  it('should render Step 1 and allow navigation to Step 2 after validation', async () => {
    const user = userEvent.setup();
    render(<Wizard />);

    // Check if Step 1 is active (title)
    expect(screen.getByText(/Step 1: Business Details/i)).toBeInTheDocument();

    // Fill out Step 1
    await user.type(screen.getByLabelText(/Business Name/i), 'Acme Corp');
    await user.type(screen.getByLabelText(/Tax ID/i), '12-3456789');
    await user.type(screen.getByLabelText(/Official Address/i), '123 Main St, Springfield');

    // Click Next
    await user.click(screen.getByText(/Next Step/i));

    // Should now show Step 2
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Board of Directors/i })).toBeInTheDocument();
    });
  });

  it('should show validation errors in Step 1 for invalid input', async () => {
    const user = userEvent.setup();
    render(<Wizard />);

    // Trigger form submission to run validation
    const nextButton = screen.getByText(/Next Step/i);
    await user.click(nextButton);

    // Check for validation messages (Zod/HookForm)
    // findByText waits for the element to appear and is the recommended way for async validation messages
    expect(await screen.findByText(/Business name must be at least 2 characters/i)).toBeInTheDocument();
    expect(await screen.findByText(/Tax ID must be in the format XX-XXXXXXX/i)).toBeInTheDocument();
    expect(await screen.findByText(/Official address must be at least 5 characters/i)).toBeInTheDocument();
  });
});

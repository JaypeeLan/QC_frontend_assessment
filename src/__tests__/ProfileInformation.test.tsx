import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProfileInformation } from '@/components/profile/ProfileInformation';
import React from 'react';

describe('ProfileInformation Component', () => {
  it('should render the profile header with correct name and title', () => {
    render(<ProfileInformation />);

    expect(screen.getByText(/Sarah Johnson/i)).toBeInTheDocument();
    expect(screen.getByText(/City Administrator, Newport News/i)).toBeInTheDocument();
  });

  it('should render all form sections', () => {
    render(<ProfileInformation />);

    expect(screen.getByText(/Personal Information/i)).toBeInTheDocument();
    expect(screen.getByText(/Organization Details/i)).toBeInTheDocument();
  });

  it('should render correctly formatted form fields with default values', () => {
    render(<ProfileInformation />);

    const firstNameInput = screen.getByLabelText(/First Name/i) as HTMLInputElement;
    expect(firstNameInput.value).toBe('Sarah');

    const emailInput = screen.getByLabelText(/Email Address/i) as HTMLInputElement;
    expect(emailInput.value).toBe('s.johnson@newportnews.gov');

    const dunsInput = screen.getByLabelText(/DUNS Number/i) as HTMLInputElement;
    expect(dunsInput.value).toBe('079859754');
  });

  it('should render the action cards', () => {
    render(<ProfileInformation />);

    expect(screen.getByText(/^New Application$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Recent Activity$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Support$/i)).toBeInTheDocument();
  });
});

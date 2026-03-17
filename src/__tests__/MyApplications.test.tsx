import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MyApplications } from '@/components/profile/MyApplications';
import { useWizardStore } from '@/lib/store';
import React from 'react';

// Mock the API to avoid delays in tests
vi.mock('@/lib/api', () => ({
  submitRegistration: vi.fn().mockResolvedValue({ success: true, message: 'Success' }),
}));

describe('MyApplications Component', () => {
  beforeEach(() => {
    // Clear the store before each test
    useWizardStore.setState({
      step: 1,
      businessDetails: null,
      directors: [],
      applications: [],
    });
  });

  it('should show empty state when no applications exist', () => {
    render(<MyApplications />);
    expect(screen.getByText(/No Applications Found/i)).toBeInTheDocument();
    expect(screen.getByText(/Create New Application/i)).toBeInTheDocument();
  });

  it('should show the wizard when "Create New Application" is clicked', async () => {
    render(<MyApplications />);
    const createBtn = screen.getByText(/Create New Application/i);
    fireEvent.click(createBtn);

    expect(screen.getByText(/New Business Registration/i)).toBeInTheDocument();
    expect(screen.getByText(/Step 1: Business Details/i)).toBeInTheDocument();
  });

  it('should list submitted applications', () => {
    const mockApp = {
      id: '123',
      businessName: 'Existing Corp',
      taxId: '12-3456789',
      officialAddress: '123 Test St',
      directors: [],
      submittedAt: new Date().toISOString(),
      status: 'pending' as const,
    };
    
    useWizardStore.setState({ applications: [mockApp] });
    
    render(<MyApplications />);
    
    expect(screen.getByText('Existing Corp')).toBeInTheDocument();
    expect(screen.getByText(/12-3456789/i)).toBeInTheDocument();
    expect(screen.getByText(/pending/i)).toBeInTheDocument();
  });

  it('should allow canceling registration to return to the list', async () => {
    render(<MyApplications />);
    fireEvent.click(screen.getByText(/Create New Application/i));
    
    expect(screen.getByText(/Cancel Registration/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Cancel Registration/i));
    
    expect(screen.getByText(/No Applications Found/i)).toBeInTheDocument();
  });
});

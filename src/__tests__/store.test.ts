import { describe, it, expect, beforeEach } from 'vitest';
import { useWizardStore } from '@/lib/store';

describe('Wizard Store', () => {
  beforeEach(() => {
    // Reset the store to its absolute initial state before each test
    useWizardStore.setState({
      step: 1,
      businessDetails: null,
      directors: [],
      applications: [],
    });
  });

  it('should have initial state', () => {
    const state = useWizardStore.getState();
    expect(state.businessDetails).toBeNull();
    expect(state.directors).toEqual([]);
    expect(state.applications).toEqual([]);
  });

  it('should update business details', () => {
    const details = {
      businessName: 'Acme Corp',
      taxId: '12-3456789',
      officialAddress: '123 Main St',
    };
    useWizardStore.getState().setBusinessDetails(details);
    expect(useWizardStore.getState().businessDetails).toEqual(details);
  });

  it('should update directors list', () => {
    const directors = [
      { id: '1', fullName: 'John Doe', role: 'Director' },
      { id: '2', fullName: 'Jane Smith', role: 'Chairman' },
    ];
    useWizardStore.getState().setDirectors(directors);
    expect(useWizardStore.getState().directors).toEqual(directors);
  });

  it('should add an application', () => {
    const application = {
      businessName: 'Acme Corp',
      taxId: '12-3456789',
      officialAddress: '123 Main St',
      directors: [{ id: '1', fullName: 'John Doe', role: 'Director' }],
    };

    useWizardStore.getState().addApplication(application);

    const apps = useWizardStore.getState().applications;
    expect(apps).toHaveLength(1);
    expect(apps[0]).toMatchObject(application);
    expect(apps[0].id).toBeDefined();
    expect(apps[0].submittedAt).toBeDefined();
    expect(apps[0].status).toBe('pending');
  });

  it('should reset the wizard state but keep applications', () => {
    useWizardStore.getState().setBusinessDetails({
      businessName: 'Dirty State',
      taxId: '00-0000000',
      officialAddress: 'Nowhere',
    });
    useWizardStore.getState().setDirectors([{ id: '1', fullName: 'John', role: 'CEO' }]);

    const application = {
      businessName: 'Saved App',
      taxId: '11-1111111',
      officialAddress: 'Saved St',
      directors: [],
    };
    useWizardStore.getState().addApplication(application);

    useWizardStore.getState().resetMizard();

    const state = useWizardStore.getState();
    expect(state.businessDetails).toBeNull();
    expect(state.directors).toEqual([]);
    expect(state.applications).toHaveLength(1);
    expect(state.applications[0].businessName).toBe('Saved App');
  });
});

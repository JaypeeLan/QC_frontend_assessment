import { describe, it, expect, vi } from 'vitest';
import { submitRegistration } from '@/lib/api';

describe('API Functions', () => {
  it('should simulate a successful registration submission', async () => {
    // We can't easily test the random failure in a deterministic way 
    // without mocking Math.random, but we can verify it eventually resolves.

    // Mock Math.random to always return a value that leads to success (> 0.25)
    vi.spyOn(Math, 'random').mockReturnValue(0.5);

    const mockData = {
      businessName: 'Test Corp',
      taxId: '12-3456789',
      officialAddress: '123 Test St',
      directors: [{ id: '1', fullName: 'Tester', role: 'Dev' }]
    };

    const result = await submitRegistration(mockData);
    expect(result).toEqual({ success: true, message: "Registration successful" });

    vi.restoreAllMocks();
  });

  it('should simulate a failed registration submission', async () => {
    // Mock Math.random to always return a value that leads to failure (<= 0.25)
    vi.spyOn(Math, 'random').mockReturnValue(0.1);

    const mockData = {
      businessName: 'Test Corp',
      taxId: '12-3456789',
      officialAddress: '123 Test St',
      directors: [{ id: '1', fullName: 'Tester', role: 'Dev' }]
    };

    await expect(submitRegistration(mockData)).rejects.toThrow("500 Internal Server Error");

    vi.restoreAllMocks();
  });
});

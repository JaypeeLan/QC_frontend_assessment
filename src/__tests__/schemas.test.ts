import { describe, it, expect } from 'vitest';
import { businessDetailsSchema, directorSchema, boardOfDirectorsSchema, registrationFormSchema } from '@/lib/schemas';

describe('Validation Schemas', () => {
  describe('businessDetailsSchema', () => {
    it('should validate correct business details', () => {
      const validData = {
        businessName: 'Acme Corp',
        taxId: '12-3456789',
        officialAddress: '123 Main St, City, State, 12345',
      };
      const result = businessDetailsSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should fail validation for incorrect taxId format', () => {
      const invalidData = {
        businessName: 'Acme Corp',
        taxId: '123-456789', // Invalid format
        officialAddress: '123 Main St, City, State, 12345',
      };
      const result = businessDetailsSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should fail validation for short business name', () => {
      const invalidData = {
        businessName: 'A', // Too short
        taxId: '12-3456789',
        officialAddress: '123 Main St, City, State, 12345',
      };
      const result = businessDetailsSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('directorSchema', () => {
    it('should validate correct director details', () => {
      const validData = {
        id: '1',
        fullName: 'John Doe',
        role: 'Director',
      };
      const result = directorSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should fail validation for empty role', () => {
      const invalidData = {
        id: '1',
        fullName: 'John Doe',
        role: '', // Invalid
      };
      const result = directorSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('boardOfDirectorsSchema', () => {
    it('should validate at least one director', () => {
      const validData = {
        directors: [{ id: '1', fullName: 'John Doe', role: 'Director' }],
      };
      const result = boardOfDirectorsSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should fail if no directors', () => {
      const invalidData = { directors: [] };
      const result = boardOfDirectorsSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should fail if more than 10 directors', () => {
      const invalidData = {
        directors: Array(11).fill({ id: '1', fullName: 'John Doe', role: 'Director' }),
      };
      const result = boardOfDirectorsSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('registrationFormSchema', () => {
    it('should validate complete form', () => {
      const validData = {
        businessName: 'Acme Corp',
        taxId: '12-3456789',
        officialAddress: '123 Main St, City, State, 12345',
        directors: [{ id: '1', fullName: 'John Doe', role: 'Director' }],
      };
      const result = registrationFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should fail if business details are missing', () => {
      const invalidData = {
        directors: [{ id: '1', fullName: 'John Doe', role: 'Director' }],
      };
      const result = registrationFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });
});

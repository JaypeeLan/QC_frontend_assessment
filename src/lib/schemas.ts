import { z } from "zod";

// Step 1: Business Details Schema
export const businessDetailsSchema = z.object({
  businessName: z.string().min(2, "Business name must be at least 2 characters."),
  taxId: z.string().regex(/^\d{2}-\d{7}$/, "Tax ID must be in the format XX-XXXXXXX."),
  officialAddress: z.string().min(5, "Official address must be at least 5 characters."),
});

// Step 2: Board of Directors Schema
export const directorSchema = z.object({
  id: z.string(), // uuid
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  role: z.string().min(2, "Role must be defined."),
});

export const boardOfDirectorsSchema = z.object({
  directors: z
    .array(directorSchema)
    .min(1, "At least one director is required.")
    .max(10, "A maximum of 10 directors is allowed."),
});

// Complete Form Schema combining everything
export const registrationFormSchema = z.object({ ...businessDetailsSchema.shape, ...boardOfDirectorsSchema.shape });

export type BusinessDetails = z.infer<typeof businessDetailsSchema>;
export type Director = z.infer<typeof directorSchema>;
export type BoardOfDirectors = z.infer<typeof boardOfDirectorsSchema>;
export type RegistrationForm = z.infer<typeof registrationFormSchema>;

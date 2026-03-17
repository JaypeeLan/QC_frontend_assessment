import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BusinessDetails, Director, RegistrationForm } from "./schemas";

export type WizardStep = 1 | 2 | 3;

export interface Application extends RegistrationForm {
  id: string;
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
}

interface WizardState {
  step: WizardStep;
  businessDetails: BusinessDetails | null;
  directors: Director[];
  applications: Application[];
  
  // Actions
  setStep: (step: WizardStep) => void;
  setBusinessDetails: (details: BusinessDetails) => void;
  setDirectors: (directors: Director[]) => void;
  addApplication: (application: RegistrationForm) => void;
  resetMizard: () => void;
}

export const useWizardStore = create<WizardState>()(
  persist(
    (set) => ({
      step: 1,
      businessDetails: null,
      directors: [],
      applications: [],
      
      setStep: (step) => set({ step }),
      setBusinessDetails: (details) => set({ businessDetails: details }),
      setDirectors: (directors) => set({ directors }),
      addApplication: (form) => set((state) => ({
        applications: [
          ...state.applications,
          {
            ...form,
            id: crypto.randomUUID(),
            submittedAt: new Date().toISOString(),
            status: "pending",
          }
        ]
      })),
      resetMizard: () => set({ step: 1, businessDetails: null, directors: [] }),
    }),
    {
      name: "qc-registration-wizard", // unique name for localStorage key
      partialize: (state) => ({ 
        step: state.step, 
        businessDetails: state.businessDetails, 
        directors: state.directors,
        applications: state.applications,
      }), // Save current step and data
    }
  )
);

"use client";

import { useState } from "react";
import { useWizardStore } from "@/lib/store";
import { submitRegistration } from "@/lib/api";
import { Button, H4, Text, Badge } from "@/components/ui";
import { toast } from "sonner";
import { registrationFormSchema } from "@/lib/schemas";

export function Step3Review({ onBack, onComplete }: { onBack: () => void; onComplete: () => void }) {
  const businessDetails = useWizardStore((s) => s.businessDetails);
  const directors = useWizardStore((s) => s.directors);
  const addApplication = useWizardStore((s) => s.addApplication);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const payload = {
      ...businessDetails,
      directors,
    } as import("@/lib/schemas").RegistrationForm;

    try {
      const validated = registrationFormSchema.safeParse(payload);
      if (!validated.success) {
        toast.error("Invalid data", {
          description: "Please review all fields before submitting.",
        });
        return;
      }
      await submitRegistration(payload);

      // Save to local storage via Zustand
      addApplication(payload);

      toast.success("Registration Submitted Successfully", {
        description: "Your business registration has been securely processed and saved.",
      });
      onComplete();
    } catch (error) {
      console.error(error);
      // 25% chance of falling case handled here
      toast.error("Submission Failed", {
        description: "Server error occurred. Your data is safe—please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!businessDetails) return null; // Safety catch

  return (
    <div className="bg-white rounded-[var(--radius-12)] p-6 lg:p-8">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <H4 className="text-[#1C355E] mb-1">Step 3: Review & Submit</H4>
          <Text className="text-[#6B7280]">Review your information carefully before final submission.</Text>
        </div>
        <Badge variant="info">Ready to Submit</Badge>
      </div>

      <div className="flex flex-col gap-8">
        {/* Business Details Review */}
        <div>
          <h5 className="font-semibold text-[length:var(--text-h5)] text-[#1C355E] border-b border-[var(--color-text-200)] pb-2 mb-4">
            Business Details
          </h5>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[length:var(--text-paragraph)]">
            <div>
              <dt className="text-[length:var(--text-small)] text-[#6B7280] mb-1">Business Name</dt>
              <dd className="font-medium text-[#1C355E]">{businessDetails.businessName}</dd>
            </div>
            <div>
              <dt className="text-[length:var(--text-small)] text-[#6B7280] mb-1">Tax ID</dt>
              <dd className="font-medium text-[#1C355E]">{businessDetails.taxId}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-[length:var(--text-small)] text-[#6B7280] mb-1">Official Address</dt>
              <dd className="font-medium text-[#1C355E]">{businessDetails.officialAddress}</dd>
            </div>
          </dl>
        </div>

        {/* Board of Directors Review */}
        <div>
          <h5 className="font-semibold text-[length:var(--text-h5)] text-[#1C355E] border-b border-[var(--color-text-200)] pb-2 mb-4 flex justify-between items-center">
            <span>Board of Directors</span>
            <span className="text-[length:var(--text-small)] font-normal text-[#6B7280]">
              {directors.length} Member{directors.length !== 1 ? 's' : ''}
            </span>
          </h5>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {directors.map((dir) => (
              <li key={dir.id} className="bg-[var(--color-bg-light)] border border-[var(--color-text-200)] rounded-[var(--radius-8)] p-3 flex justify-between items-center">
                <span className="font-medium text-[#1C355E]">{dir.fullName}</span>
                <Badge variant="neutral" className="capitalize">{dir.role}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-between mt-8 pt-4 border-t border-[var(--color-text-200)]">
        <Button type="button" variant="outline" onClick={onBack} disabled={isSubmitting} className="px-8">
          ← Back
        </Button>
        <Button
          type="button"
          variant="primary"
          onClick={handleSubmit}
          loading={isSubmitting}
          className="px-10"
        >
          Submit Registration
        </Button>
      </div>
    </div>
  );
}

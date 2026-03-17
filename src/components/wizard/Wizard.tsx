"use client";

import { useEffect, useState } from "react";
import { useWizardStore } from "@/lib/store";
import { Step1BusinessDetails } from "./Step1BusinessDetails";
import { Step2BoardOfDirectors } from "./Step2BoardOfDirectors";
import { Step3Review } from "./Step3Review";
import { H2, Text, Button, Icon } from "@/components/ui";

export function Wizard() {
  const step = useWizardStore((s) => s.step);
  const setStep = useWizardStore((s) => s.setStep);
  const resetMizard = useWizardStore((s) => s.resetMizard);
  const [isClient, setIsClient] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Fix hydration mismatch since we are using localStorage
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  if (isComplete) {
    return (
      <div className="bg-white rounded-[var(--radius-12)] border border-[var(--color-success-200)] shadow-[var(--shadow-md)] p-10 text-center max-w-2xl mx-auto flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-[var(--color-success-100)] text-[var(--color-success-600)] flex items-center justify-center mb-6">
          <Icon name="file" className="w-8 h-8" />
        </div>
        <H2 className="text-[var(--color-success-700)] mb-3">Registration Complete</H2>
        <Text muted className="mb-8">Your application has been successfully received by the Office of Local Defense Community Cooperation. A confirmation email has been sent to your address.</Text>
        <Button
          variant="primary"
          onClick={() => {
            resetMizard();
            setIsComplete(false);
          }}
        >
          Start New Registration
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto w-full">
      {/* Wizard Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-[var(--color-text-200)] -z-10 rounded-full"></div>
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[var(--color-primary-500)] -z-10 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          ></div>

          {[1, 2, 3].map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 border-2 ${step === s
                    ? "bg-[var(--color-primary-600)] border-[var(--color-primary-600)] text-white shadow-md shadow-blue-500/20"
                    : step > s
                      ? "bg-[var(--color-primary-100)] border-[var(--color-primary-500)] text-[var(--color-primary-700)]"
                      : "bg-white border-[var(--color-text-300)] text-[var(--color-text-400)]"
                  }`}
              >
                {step > s ? (
                  <Icon name="window" className="w-5 h-5" />
                ) : (
                  s
                )}
              </div>
              <span className={`text-xs font-semibold ${step >= s ? "text-[var(--color-primary-700)]" : "text-[var(--color-text-400)]"}`}>
                {s === 1 ? "Business" : s === 2 ? "Directors" : "Review"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Render Current Step */}
      <div className="transition-all">
        {step === 1 && <Step1BusinessDetails onNext={() => setStep(2)} />}
        {step === 2 && <Step2BoardOfDirectors onNext={() => setStep(3)} onBack={() => setStep(1)} />}
        {step === 3 && (
          <Step3Review
            onBack={() => setStep(2)}
            onComplete={() => setIsComplete(true)}
          />
        )}
      </div>
    </div>
  );
}

"use client";

import { useForm, useWatch } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { businessDetailsSchema, type BusinessDetails } from "@/lib/schemas";
import { useWizardStore } from "@/lib/store";
import { Input, Button, H4, Text } from "@/components/ui";

export function Step1BusinessDetails({ onNext }: { onNext: () => void }) {
  const businessDetails = useWizardStore((s) => s.businessDetails);
  const setBusinessDetails = useWizardStore((s) => s.setBusinessDetails);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<BusinessDetails>({
    resolver: zodResolver(businessDetailsSchema),
    defaultValues: businessDetails || {
      businessName: "",
      taxId: "",
      officialAddress: "",
    },
  });

  const values = useWatch({ control });
  useEffect(() => {
    setBusinessDetails(values as BusinessDetails);
  }, [values, setBusinessDetails]);

  const onSubmit = (data: BusinessDetails) => {
    setBusinessDetails(data);
    onNext();
  };

  return (
    <div className="bg-white rounded-[var(--radius-12)] p-6 lg:p-8">
      <div className="mb-6">
        <H4 className="text-[#1C355E] mb-1">Step 1: Business Details</H4>
        <Text className="text-[#6B7280]">Please provide the official details for your business registration.</Text>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
        <Input
          id="businessName"
          label="Business Name"
          placeholder="e.g. Acme Corp Ltd."
          {...register("businessName")}
          error={errors.businessName?.message}
          required
        />
        <Input
          id="taxId"
          label="Tax ID"
          placeholder="XX-XXXXXXX"
          hint="Your 9-digit federal Tax Identification Number (Format: XX-XXXXXXX)."
          {...register("taxId")}
          error={errors.taxId?.message}
          required
        />
        <Input
          id="officialAddress"
          label="Official Address"
          placeholder="123 Main Street, City, State, ZIP"
          {...register("officialAddress")}
          error={errors.officialAddress?.message}
          required
        />

        <div className="flex justify-end mt-4">
          <Button type="submit" variant="primary" className="px-8">
            Next step →
          </Button>
        </div>
      </form>
    </div>
  );
}

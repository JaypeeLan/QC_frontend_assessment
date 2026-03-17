"use client";

import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { boardOfDirectorsSchema, type BoardOfDirectors, type Director } from "@/lib/schemas";
import { useWizardStore } from "@/lib/store";
import { Input, Button, H4, Text, Select } from "@/components/ui";

export function Step2BoardOfDirectors({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const directors = useWizardStore((s) => s.directors);
  const setDirectors = useWizardStore((s) => s.setDirectors);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BoardOfDirectors>({
    resolver: zodResolver(boardOfDirectorsSchema),
    defaultValues: {
      directors:
        directors.length > 0
          ? directors
          : [{ id: crypto.randomUUID(), fullName: "", role: "director" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "directors",
  });

  const watched = useWatch({ control });
  useEffect(() => {
    const list = (watched?.directors || []) as Partial<Director>[];
    const cleaned = list
      .filter((d) => d && d.id)
      .map((d) => ({
        id: d.id as string,
        fullName: (d.fullName ?? "") as string,
        role: (d.role ?? "director") as string,
      }));
    setDirectors(cleaned);
  }, [watched, setDirectors]);

  const onSubmit = (data: BoardOfDirectors) => {
    setDirectors(data.directors);
    onNext();
  };

  return (
    <div className="bg-white rounded-[var(--radius-12)] p-6 lg:p-8">
      <div className="mb-6">
        <H4 className="text-[#1C355E] mb-1">Step 2: Board of Directors</H4>
        <Text className="text-[#6B7280]">
          Add the members of your Board of Directors (Min 1, Max 10).
        </Text>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex flex-col sm:flex-row gap-5 items-end bg-[var(--color-bg-light)] p-4 rounded-[var(--radius-8)] border border-[var(--color-text-200)]"
          >
            <div className="w-full flex-1">
              <Input
                id={`directors.${index}.fullName`}
                label="Full Name"
                placeholder="Name"
                {...register(`directors.${index}.fullName` as const)}
                error={errors.directors?.[index]?.fullName?.message}
                required
              />
            </div>
            <div className="w-full sm:w-1/3">
              <Select
                id={`directors.${index}.role`}
                label="Role"
                {...register(`directors.${index}.role` as const)}
                options={[
                  { value: "director", label: "Director" },
                  { value: "chairman", label: "Chairman" },
                  { value: "secretary", label: "Secretary" },
                  { value: "treasurer", label: "Treasurer" },
                ]}
              />
            </div>
            {fields.length > 1 && (
              <Button
                type="button"
                variant="destructive"
                className="mb-[2px] w-full sm:w-auto px-3 shrink-0"
                onClick={() => remove(index)}
              >
                Remove
              </Button>
            )}
            <input type="hidden" {...register(`directors.${index}.id` as const)} />
          </div>
        ))}
        {errors.directors?.message && (
          <p className="text-[length:var(--text-small)] text-[var(--color-error-600)] mt-[-10px]">
            {errors.directors.message}
          </p>
        )}

        {fields.length < 10 && (
          <div>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                append({ id: crypto.randomUUID(), fullName: "", role: "director" })
              }
            >
              + Add Director
            </Button>
          </div>
        )}

        <div className="flex justify-between mt-6 pt-4 border-t border-[var(--color-text-200)]">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="px-8"
          >
            ← Back
          </Button>
          <Button type="submit" variant="primary" className="px-8">
            Next step →
          </Button>
        </div>
      </form>
    </div>
  );
}

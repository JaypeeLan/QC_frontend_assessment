"use client";

import { useState } from "react";
import { useWizardStore } from "@/lib/store";
import { Badge, Text, H4, Button, AppImage } from "@/components/ui";
import { Wizard } from "@/components/wizard/Wizard";

export function MyApplications() {
  const applications = useWizardStore((s) => s.applications);
  const [isCreating, setIsCreating] = useState(false);

  if (isCreating) {
    return (
      <div className="flex flex-col gap-6 mx-auto w-full items-center">
        <div className="w-full max-w-4xl text-left mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-[length:var(--text-h2)] font-bold text-[#1C355E] leading-tight mb-2">
              New Business Registration
            </h1>
            <Text className="text-[#6B7280]">
              Complete the multi-step wizard below to apply for your local defense community grant.
            </Text>
          </div>
          <Button variant="outline" size="sm" onClick={() => setIsCreating(false)}>
            Cancel Registration
          </Button>
        </div>
        <Wizard />
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[var(--radius-12)] border border-[var(--color-text-200)] shadow-[var(--shadow-sm)]">
        <AppImage name="my-applications-icon" alt="No Applications" width={112} height={112} className="w-28 h-28 object-contain mb-4" />
        <H4 className="text-[#1C355E] mb-2">No Applications Found</H4>
        <Text muted className="max-w-xs text-center mb-8">
          You haven&apos;t submitted any business registration applications yet.
        </Text>
        <Button variant="primary" onClick={() => setIsCreating(true)}>
          Create New Application
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-[length:var(--text-h2)] font-bold text-[#1C355E] leading-tight mb-2">
            My Applications
          </h1>
          <Text className="text-[#6B7280]">
            Manage and track the status of your submitted business registrations.
          </Text>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="info" className="px-3 py-1">
            {applications.length} Total
          </Badge>
          <Button variant="primary" size="sm" onClick={() => setIsCreating(true)}>
            + New Application
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {applications.map((app) => (
          <div
            key={app.id}
            className="bg-white p-5 rounded-[var(--radius-12)] border border-[var(--color-text-200)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[length:var(--text-h5)] text-[var(--color-text-900)]">
                  {app.businessName}
                </span>
                <Badge
                  variant={app.status === 'pending' ? 'warning' : app.status === 'approved' ? 'success' : 'error'}
                  className="capitalize text-[10px] px-2 py-0"
                >
                  {app.status}
                </Badge>
              </div>
              <Text size="small" muted className="flex items-center gap-2">
                <span className="font-medium text-[var(--color-text-700)]">Tax ID:</span> {app.taxId}
                <span className="mx-1">•</span>
                <span className="font-medium text-[var(--color-text-700)]">Submitted:</span> {new Date(app.submittedAt).toLocaleDateString()}
              </Text>
              <Text size="small" muted className="truncate max-w-md">
                {app.officialAddress}
              </Text>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
              <Button variant="outline" size="sm" className="flex-1 sm:flex-initial">
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

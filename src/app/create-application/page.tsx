"use client";

import { Text, Icon, AppImage, Button } from "@/components/ui";
import { Toaster } from "sonner";
import { Wizard } from "@/components/wizard/Wizard";
import Link from "next/link";
import { useWizardStore } from "@/lib/store";
import { useRouter } from "next/navigation";

export default function CreateApplicationPage() {
  const { resetMizard } = useWizardStore();
  const router = useRouter();

  const handleCancel = () => {
    resetMizard();
    router.push("/");
  };

  return (
    <div className="h-screen bg-[var(--color-bg-page)] flex flex-col font-[var(--font-family-sans)] overflow-hidden">
      <Toaster position="top-center" richColors />

      {/* ── TOP HEADER ───────────────────────────────────────────────────────── */}
      <header className="flex flex-col bg-white shrink-0 z-10">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex items-center justify-center">
                <AppImage name="logo" alt="U.S. Dept Defense" width={48} height={48} className="w-12 h-12 object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[length:var(--text-paragraph)] text-[#1C355E] leading-tight">U.S. Department of Defense</span>
                <span className="text-[11px] text-[#6B7280] leading-tight">Office of Local Defense Community<br />Cooperation</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                <AppImage name="avatar" alt="Avatar" width={40} height={40} className="w-full h-full object-cover" />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-[length:var(--text-small)] font-bold text-[#1C355E] leading-tight">Sarah Johnson</span>
                <span className="text-[11px] text-[#6B7280] leading-tight">City Administrator</span>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[3px] bg-[#1C355E] w-full" />
      </header>

      {/* ── BREADCRUMBS ────────────────────────────────────────────────────── */}
      <div className="border-b border-[var(--color-text-200)] bg-white px-6 py-3 flex justify-between items-center text-[length:var(--text-small)] shrink-0">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-[var(--color-text-500)] hover:text-[var(--color-text-900)] cursor-pointer">Home</Link>
          <Icon name="arrow-down" className="w-3 h-3 -rotate-90 text-[var(--color-text-400)]" />
          <span className="text-[var(--color-text-500)] hover:text-[var(--color-text-900)] cursor-pointer">My Applications</span>
          <Icon name="arrow-down" className="w-3 h-3 -rotate-90 text-[var(--color-text-400)]" />
          <span className="font-semibold text-[var(--color-primary-700)]">New Application</span>
        </div>
      </div>

      <div className="flex flex-1 w-full mx-auto overflow-hidden">
        {/* ── MAIN CONTENT AREA ────────────────────────────────────────────────── */}
        <main className="flex-1 p-6 lg:p-10 pb-20 overflow-y-auto bg-[var(--color-bg-page)]">
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
              <Button 
                variant="outline" 
                size="sm" 
                className="px-3 py-1.5 font-bold"
                onClick={handleCancel}
              >
                Cancel Registration
              </Button>
            </div>
            <Wizard />
          </div>
        </main>
      </div>
    </div>
  );
}

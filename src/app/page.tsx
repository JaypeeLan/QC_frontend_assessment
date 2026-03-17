"use client";

import { useState } from "react";
import { useWizardStore } from "@/lib/store";
import { Text, Icon, AppImage, H4 } from "@/components/ui";
import { IconName } from "@/components/ui/Icon";
import { ProfileInformation } from "@/components/profile/ProfileInformation";
import { MyApplications } from "@/components/profile/MyApplications";
import { Toaster } from "sonner";

export default function ProfilePage() {
  const { activeTab, setActiveTab } = useWizardStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sidebarItems: { label: string; icon: IconName }[] = [
    { label: "Profile Information", icon: "profile-icon" },
    { label: "My Applications", icon: "file" },
    { label: "Application Status", icon: "application-status-icon" },
    { label: "Notifications", icon: "notifications-icon" },
    { label: "Documents", icon: "documents-icon" },
    { label: "Settings", icon: "settings-icon" },
  ];

  const handleTabChange = (label: string) => {
    setActiveTab(label);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="h-screen bg-[var(--color-bg-page)] flex flex-col font-[var(--font-family-sans)] overflow-hidden">
      <Toaster position="top-center" richColors />

      {/* ── MOBILE DRAWER ─────────────────────────────────────────────────── */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <aside className="absolute top-0 left-0 h-full w-[280px] bg-white shadow-2xl flex flex-col py-6 overflow-y-auto animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between px-6 mb-8">
              <span className="font-bold text-[length:var(--text-paragraph)] text-[#1C355E]">Menu</span>
              <button
                className="p-2 text-[#6B7280] hover:text-[#1C355E] cursor-pointer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-6 mb-4">
              <span className="font-bold text-xs uppercase tracking-wider text-[#9CA3AF]">Account Management</span>
            </div>

            <nav className="flex flex-col gap-1 px-3">
              {sidebarItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleTabChange(item.label)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-8)] text-[length:var(--text-paragraph)] font-semibold transition-colors cursor-pointer ${activeTab === item.label
                    ? "bg-[#EBF5FF] text-[#005EA2]"
                    : "text-[#6B7280] hover:bg-gray-50 hover:text-[#1C355E]"
                    }`}
                >
                  <div className={`w-5 h-5 flex items-center justify-center ${activeTab === item.label ? 'text-[#005EA2]' : 'text-[#6B7280]'}`}>
                    <Icon name={item.icon} className="w-4 h-4" />
                  </div>
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>
        </div>
      )}

      {/* ── TOP HEADER ───────────────────────────────────────────────────────── */}
      <header className="flex flex-col bg-white shrink-0 z-10">
        {/* Main Header */}
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 -ml-2 text-[#6B7280] hover:text-[#1C355E] transition-colors cursor-pointer"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Logo */}
            <div className="flex items-center justify-center">
              <AppImage name="logo" alt="U.S. Dept Defense" width={48} height={48} className="w-12 h-12 object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[length:var(--text-paragraph)] text-[#1C355E] leading-tight">U.S. Department of Defense</span>
              <span className="text-[11px] text-[#6B7280] leading-tight">Office of Local Defense Community<br />Cooperation</span>
            </div>
          </div>

          <nav className="hidden xl:flex items-center gap-8">
            <a href="#" className="font-bold text-[length:var(--text-small)] text-[#1C355E] hover:text-[#005EA2] transition-colors cursor-pointer">Our Story</a>
            <a href="#" className="font-bold text-[length:var(--text-small)] text-[#1C355E] hover:text-[#005EA2] transition-colors cursor-pointer">One Community</a>
            <a href="#" className="font-bold text-[length:var(--text-small)] text-[#1C355E] hover:text-[#005EA2] transition-colors cursor-pointer">Our Process</a>
            <a href="#" className="font-bold text-[length:var(--text-small)] text-[#1C355E] hover:text-[#005EA2] transition-colors flex items-center gap-1.5 cursor-pointer">
              Our Programs
              <Icon name="arrow-down" className="w-3 h-3 text-[#6B7280]" />
            </a>
            <a href="#" className="font-bold text-[length:var(--text-small)] text-[#1C355E] hover:text-[#005EA2] transition-colors cursor-pointer">News & Resources</a>
          </nav>

          <div className="flex items-center gap-6">
            <button className="relative text-[#6B7280] hover:text-[#1C355E] transition-colors flex items-center justify-center cursor-pointer">
              <Icon name="notifications-icon" width={15} height={28} className="w-[15px] h-[28px] object-contain" />
              <span className="absolute top-1 -right-0.5 w-2 h-2 bg-[#EF4444] rounded-full border border-white" />
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 cursor-pointer">
                <AppImage name="avatar" alt="Avatar" width={40} height={40} className="w-full h-full object-cover" />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-[length:var(--text-small)] font-bold text-[#1C355E] leading-tight cursor-pointer">Sarah Johnson</span>
                <span className="text-[11px] text-[#6B7280] leading-tight">City Administrator</span>
              </div>
              <Icon name="arrow-down" className="w-3 h-3 text-[#6B7280] ml-1 cursor-pointer" />
            </div>
          </div>
        </div>
        {/* Decorative dark bottom border */}
        <div className="h-[3px] bg-[#1C355E] w-full" />
      </header>

      {/* ── BREADCRUMBS ────────────────────────────────────────────────────── */}
      <div className="border-b border-[var(--color-text-200)] bg-white px-6 py-3 flex justify-between items-center text-[length:var(--text-small)] shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-[var(--color-text-500)] hover:text-[var(--color-text-900)] cursor-pointer">Home</span>
          <Icon name="arrow-down" className="w-3 h-3 -rotate-90 text-[var(--color-text-400)]" />
          <span className="font-semibold text-[var(--color-primary-700)]">{activeTab === "New Application" ? "New Application" : "My Profile"}</span>
        </div>
      </div>

      <div className="flex flex-1 w-full mx-auto overflow-hidden">

        {/* ── SIDEBAR NAV ──────────────────────────────────────────────────────── */}
        <aside className="hidden md:flex flex-col w-64 border-r border-[var(--color-text-200)] bg-white shrink-0 py-6 overflow-y-auto">
          <div className="px-6 mb-4">
            <span className="font-bold text-[length:var(--text-paragraph)] text-[#1C355E]">Account Management</span>
          </div>
          <nav className="flex flex-col gap-1 px-3">
            {sidebarItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleTabChange(item.label)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-8)] text-[length:var(--text-paragraph)] font-semibold transition-colors cursor-pointer ${activeTab === item.label
                  ? "bg-[#EBF5FF] text-[#005EA2]"
                  : "text-[#6B7280] hover:bg-gray-50 hover:text-[#1C355E]"
                  }`}
              >
                <div className={`w-5 h-5 flex items-center justify-center ${activeTab === item.label ? 'text-[#005EA2]' : 'text-[#6B7280]'}`}>
                  <Icon name={item.icon} className="w-4 h-4" />
                </div>
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* ── MAIN CONTENT AREA ────────────────────────────────────────────────── */}
        <main className="flex-1 p-6 lg:p-10 pb-20 overflow-y-auto bg-[var(--color-bg-page)]">
          {activeTab === "Profile Information" ? (
            <ProfileInformation />
          ) : activeTab === "My Applications" ? (
            <MyApplications />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-[var(--color-text-400)]">
              <Icon name="window" className="w-16 h-16 mb-4 opacity-20" />
              <H4 className="opacity-50">{activeTab} Section Coming Soon</H4>
              <Text muted>This part of the portal is currently under development.</Text>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

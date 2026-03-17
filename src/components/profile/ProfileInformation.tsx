"use client";

import React from "react";
import { useWizardStore } from "@/lib/store";
import { H4, Text, Input, Button, Select, AppImage, Icon } from "@/components/ui";

export function ProfileInformation() {
    const { setActiveTab, setIsCreating } = useWizardStore();

    const handleStartApplication = () => {
        setActiveTab("My Applications");
        setIsCreating(true);
    };

    return (
        <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto px-4 sm:px-0">
            {/* ── PROFILE HEADER CARD ─────────────────────────────────────────────── */}
            <div className="bg-white rounded-[var(--radius-12)] border border-[var(--color-text-200)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] p-6 md:p-8 flex flex-col md:flex-row items-start justify-between gap-6">
                <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="relative group shrink-0 mt-1">
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white shadow-sm">
                            <AppImage
                                name="avatar"
                                alt="Sarah Johnson"
                                width={112}
                                height={112}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <button className="absolute bottom-1 right-1 p-2 bg-[#005EA2] text-white rounded-full shadow-sm hover:bg-[#004e8a] transition-colors border-2 border-white">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M4 4h3l2-2h6l2 2h3a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm8 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex flex-col text-left">
                        <H4 className="text-[#1C355E] font-bold text-[length:var(--text-h4)]">Sarah Johnson</H4>
                        <Text className="text-[#6B7280] font-medium mt-0.5">City Administrator, Newport News</Text>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-3">
                            <div className="flex items-center gap-2 text-[length:var(--text-small)] text-[#6B7280]">
                                <Icon name="email-icon" width={16} height={16} className="text-[#9CA3AF]" />
                                <span>s.johnson@newportnews.gov</span>
                            </div>
                            <div className="flex items-center gap-2 text-[length:var(--text-small)] text-[#6B7280]">
                                <Icon name="phone-icon" width={16} height={16} className="text-[#9CA3AF]" />
                                <span>(757) 926-8400</span>
                            </div>
                        </div>
                    </div>
                </div>
                <Button variant="primary" size="md" className="shrink-0 px-8 font-bold bg-[#005EA2] rounded-[var(--radius-8)] mt-1">
                    Edit Profile
                </Button>
            </div>

            {/* ── PERSONAL INFORMATION ────────────────────────────────────────────── */}
            <div className="bg-white rounded-[var(--radius-12)] border border-[var(--color-text-200)] shadow-[var(--shadow-sm)] p-8 md:p-10">
                <div className="mb-8">
                    <H4 className="text-[#1C355E] font-bold">Personal Information</H4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                    <Input id="firstName" label="First Name" defaultValue="Sarah" required />
                    <Input id="lastName" label="Last Name" defaultValue="Johnson" required />
                    <Input id="emailAddress" label="Email Address" defaultValue="s.johnson@newportnews.gov" required />
                    <Input id="phoneNumber" label="Phone Number" defaultValue="(757) 926-8400" required />
                    <div className="md:col-span-2">
                        <Input id="organization" label="Organization" defaultValue="City of Newport News" required />
                    </div>
                    <Input id="titlePosition" label="Title/Position" defaultValue="City Administrator" required />
                    <Input id="department" label="Department" defaultValue="City Management" required />
                </div>
            </div>

            {/* ── ORGANIZATION DETAILS ───────────────────────────────────────────── */}
            <div className="bg-white rounded-[var(--radius-12)] border border-[var(--color-text-200)] shadow-[var(--shadow-sm)] p-8 md:p-10">
                <div className="mb-8">
                    <H4 className="text-[#1C355E] font-bold">Organization Details</H4>
                </div>

                <div className="flex flex-col gap-6">
                    <Select
                        id="orgType"
                        label="Organization Type"
                        defaultValue="Municipal Government"
                        required
                        options={[
                            { value: "Municipal Government", label: "Municipal Government" },
                            { value: "State Government", label: "State Government" },
                            { value: "Non-Profit", label: "Non-Profit" },
                        ]}
                    />
                    <Input id="address" label="Address" defaultValue="2400 Washington Ave" required />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                        <Input id="city" label="City" defaultValue="Newport News" required />
                        <Select
                            id="state"
                            label="State"
                            defaultValue="Virginia"
                            required
                            options={[
                                { value: "Virginia", label: "Virginia" },
                                { value: "Maryland", label: "Maryland" },
                                { value: "North Carolina", label: "North Carolina" },
                            ]}
                        />
                        <Input id="zipCode" label="ZIP Code" defaultValue="23607" required />
                        <Input id="dunsNumber" label="DUNS Number" defaultValue="079859754" required />
                    </div>
                </div>
            </div>

            {/* ── ACTION CARDS ─────────────────────────────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-[var(--radius-12)] border border-[var(--color-text-200)] shadow-[var(--shadow-sm)] p-8 flex flex-col gap-8">
                    <div className="flex items-center gap-4">
                        <AppImage name="new-application-img" alt="New Application" width={48} height={48} className="w-12 h-12 object-contain" />
                        <div className="flex flex-col">
                            <span className="font-bold text-[#1C355E] text-[length:var(--text-paragraph)]">New Application</span>
                            <Text size="small" className="text-[#6B7280]">Start a new grant application</Text>
                        </div>
                    </div>
                    <Button variant="primary" size="md" fullWidth className="font-bold bg-[#005EA2] rounded-[var(--radius-8)] py-3" onClick={handleStartApplication}>Start Application</Button>
                </div>

                <div className="bg-white rounded-[var(--radius-12)] border border-[var(--color-text-200)] shadow-[var(--shadow-sm)] p-8 flex flex-col gap-8">
                    <div className="flex items-center gap-4">
                        <AppImage name="recent-activity-img" alt="Recent Activity" width={48} height={48} className="w-12 h-12 object-contain" />
                        <div className="flex flex-col">
                            <span className="font-bold text-[#1C355E] text-[length:var(--text-paragraph)]">Recent Activity</span>
                            <Text size="small" className="text-[#6B7280]">View latest updates</Text>
                        </div>
                    </div>
                    <Button variant="outline" size="md" fullWidth className="font-bold text-[#374151] border-[#D1D5DB] hover:bg-gray-50 rounded-[var(--radius-8)] py-3">View Activity</Button>
                </div>

                <div className="bg-white rounded-[var(--radius-12)] border border-[var(--color-text-200)] shadow-[var(--shadow-sm)] p-8 flex flex-col gap-8">
                    <div className="flex items-center gap-4">
                        <AppImage name="support-img" alt="Support" width={48} height={48} className="w-12 h-12 object-contain" />
                        <div className="flex flex-col">
                            <span className="font-bold text-[#1C355E] text-[length:var(--text-paragraph)]">Support</span>
                            <Text size="small" className="text-[#6B7280]">Get help with applications</Text>
                        </div>
                    </div>
                    <Button variant="outline" size="md" fullWidth className="font-bold text-[#374151] border-[#D1D5DB] hover:bg-gray-50 rounded-[var(--radius-8)] py-3">Contact Support</Button>
                </div>
            </div>

            {/* ── BOTTOM ACTIONS ────────────────────────────────────────────────── */}
            <div className="flex justify-end gap-4 mt-4 pb-20">
                <Button variant="outline" size="md" className="px-10 font-bold text-[#374151] border-[#D1D5DB] hover:bg-gray-50 rounded-[var(--radius-8)]">Cancel Changes</Button>
                <Button variant="primary" size="md" className="px-10 font-bold bg-[#005EA2] rounded-[var(--radius-8)]">Save Changes</Button>
            </div>
        </div>
    );
}

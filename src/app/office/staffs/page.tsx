"use client"

import StaffDetail from "@/components/staff/staff-detail";

export default function StaffsPage() {
  return (
    <div className="hidden flex-col md:flex fade-in">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <StaffDetail/>
        </div>
    </div>
  );
};

  
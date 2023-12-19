"use client"

import LocationDisplay from "@/components/location/location-display";

export default function CentralHubPage() {
    return (
        <div className="hidden flex-col md:flex fade-in">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Central Hub</h2>
            {/* Search */}
            <div className="flex items-center space-x-2">

            </div>
          </div>
          <div  className="space-y-4">
            <LocationDisplay locationType="tap_ket"/>
          </div>
        </div>
      </div>
    )
}
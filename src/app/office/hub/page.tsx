import LocationDisplay from "@/components/location/location-display";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function HubPage() {
    return (
      <div className="hidden flex-col md:flex fade-in">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Hub Manager</h2>
          </div>
          <div  className="space-y-4">
          <Tabs defaultValue="central-hub" className="">
            <TabsList>
              <TabsTrigger value="central-hub">Central Hub</TabsTrigger>
              <TabsTrigger value="hub">Hub</TabsTrigger>
            </TabsList>
            <TabsContent value="central-hub" className="">
              <LocationDisplay locationType="tap_ket"/>
            </TabsContent>
            <TabsContent value="hub">
              <LocationDisplay locationType="giao_dich"/>
            </TabsContent>
          </Tabs>
          </div>
        </div>
      </div>
    )
}
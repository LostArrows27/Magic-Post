"use client";

import { useLocationDetail } from "@/hooks/useLocationDetail";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import StaffDisplay from "../staff/staff-display";
import { Info } from "lucide-react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import StatisticsDisplay from "../statistics/statistics-display";
import convertStaffRole from "@/lib/convertStaffRole";
import { useStaffModal } from "@/hooks/useStaffModal";

export default function LocationDetail() {
  const { isOpen, onClose, manager, hub_id, hub_type } = useLocationDetail(
    (set) => set
  );

  const { onOpen } = useStaffModal();

  return (
    <>
      <div className={cn("space-y-4 fade-in mt-4", isOpen ? "" : "hidden")}>
        {/* Hub name */}
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between space-y-2">
            <h3 className="text-2xl font-bold tracking-tight">
              {hub_type === "tap_ket" ? (
                <>Central Hub: {hub_id}</>
              ) : (
                <>Hub: {hub_id}</>
              )}
            </h3>
          </div>
          <Button
            variant="link"
            onClick={() => {
              onClose();
            }}
            className="text-xl font-bold tracking-tight"
          >
            ← Back to list
          </Button>
        </div>
        <Tabs defaultValue="staff-view" className="">
          <TabsList>
            <TabsTrigger value="staff-view">Staffs</TabsTrigger>
            <TabsTrigger value="statistics-view">Statistics</TabsTrigger>
          </TabsList>
          <TabsContent value="staff-view" className="">
            <div>
              <div className="flex flex-col">
                <h4 className="text-xl font-semibold tracking-tight ml-3">
                  Manager
                </h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-24">Index</TableHead>
                      <TableHead className="w-60">Full Name</TableHead>
                      <TableHead className="w-32">Gender</TableHead>
                      <TableHead className="w-44">DoB</TableHead>
                      <TableHead className="w-56">Phone Number</TableHead>
                      <TableHead className="">Role</TableHead>
                      <TableHead className="text-right">More</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">{1}</TableCell>
                      <TableCell>{manager.full_name}</TableCell>
                      <TableCell className="capitalize">
                        {manager.gender}
                      </TableCell>
                      <TableCell>{manager.dob}</TableCell>
                      <TableCell>{manager.phone_number}</TableCell>
                      <TableCell className="capitalize">
                        {convertStaffRole(manager.role)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Info
                          onClick={() => {
                            onOpen(manager);
                          }}
                          className=" float-right cursor-pointer"
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className="flex flex-col mt-8">
                <StaffDisplay
                  work_place_id={hub_id}
                  work_place_type={hub_type}
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="statistics-view">
            <StatisticsDisplay
              work_place_id={hub_id}
              work_place_type={hub_type}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

"use client";

import { useSessionContext } from "@supabase/auth-helpers-react";
import { use, useEffect } from "react";
import { useStaff } from "@/hooks/useStaff";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Info, UserPlus } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useStaffModal } from "@/hooks/useStaffModal";
import convertStaffRole from "@/lib/convertStaffRole";
import { useUser } from "@/hooks/useUser";

export default function StaffDisplay({
  work_place_id,
  work_place_type,
}: {
  work_place_id: string | null | undefined;
  work_place_type: string;
}) {
  let role = work_place_type === "tap_ket" ? "tk_staff" : "gd_staff";

  const router = useRouter();
  const { onOpen } = useStaffModal();
  const { supabaseClient: supabase } = useSessionContext();
  const { userDetails } = useUser();
  let { staffs, isLoading, isError, fetchStaffs } = useStaff();

  useEffect(() => {
    fetchStaffs(work_place_id, role, supabase);
  }, [fetchStaffs, work_place_id, work_place_type]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching locations</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xl font-bold  ml-3">Staffs</h4>
        {userDetails.role !== "leader" && (
          <Button
            variant="link"
            className="text-lg font-bold tracking-tight"
            onClick={async () => {
              router.push("/office/new-staff");
            }}
          >
            + New Staff
          </Button>
        )}
      </div>
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
          <>
            {staffs.map((staff, index) => (
              <TableRow key={staff.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{staff.full_name}</TableCell>
                <TableCell className="capitalize">{staff.gender}</TableCell>
                <TableCell>{staff.dob}</TableCell>
                <TableCell>{staff.phone_number}</TableCell>
                <TableCell className="capitalize">
                  {convertStaffRole(staff.role)}
                </TableCell>
                <TableCell className="text-right">
                  <Info
                    onClick={() => {
                      onOpen(staff);
                    }}
                    className=" float-right cursor-pointer"
                  />
                </TableCell>
              </TableRow>
            ))}
          </>
        </TableBody>
      </Table>
    </div>
  );
}

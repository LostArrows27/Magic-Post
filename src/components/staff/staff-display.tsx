"use client"

import { useSessionContext } from '@supabase/auth-helpers-react';
import { useEffect } from 'react';
import { useStaff } from '@/hooks/useStaff';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Info } from 'lucide-react';

export default function StaffDisplay({work_place_id, work_place_type}: {work_place_id: string; work_place_type: string}) {
  let role = work_place_type === "tap_ket" ? "tk_staff": "gd_staff";    
  
  const {
    supabaseClient: supabase,
  } = useSessionContext();

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
    <div className='space-y-4'>
        <h4 className="text-xl font-semibold tracking-tight ml-3">Staffs</h4>
        <Table>
            <TableHeader>
                <TableRow>
                <TableHead className="w-24">Index</TableHead>
                <TableHead className="w-60">Full Name</TableHead>
                <TableHead className="w-32">Gender</TableHead>
                <TableHead className="w-44">DoB</TableHead>
                <TableHead className="w-56">Phone Number</TableHead>
                <TableHead className="w-24">Role</TableHead>
                <TableHead className="text-right">More</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {staffs.length > 0 ? (
                    <>
                    {staffs.map((staff, index) => (
                        <TableRow key={staff.id}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>{staff.full_name}</TableCell>
                            <TableCell className='capitalize'>{staff.gender}</TableCell>
                            <TableCell>{staff.dob}</TableCell>
                            <TableCell>{staff.phone_number}</TableCell>
                            <TableCell className="capitalize">{staff.role}</TableCell>
                            <TableCell className="text-right"><Info className=" float-right cursor-pointer"/></TableCell>
                        </TableRow>
                    ))}
                    </>
                ) : (
                    <div className="ml-4 mt-2">
                        No record
                    </div>
                )}
            </TableBody>
        </Table>
    </div>
  );
};

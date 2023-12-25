import { cn } from "@/lib/utils";
import StaffDisplay from "@/components/staff/staff-display";
import { useUser } from "@/hooks/useUser";

export default function StaffDetail() {
  const { userDetails } = useUser();

  let work_place_type = userDetails?.role === "tk_admin" ? "tap_ket": "giao_dich";    
  
  return (
    <>
        <div className={cn(
            `space-y-4 fade-in mt-4`,
        )}>
            {/* Hub name */}
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-between space-y-2">
                    <h3 className="text-2xl font-bold tracking-tight">
                        {work_place_type === "tap_ket" ? (
                            <>Central Hub: {userDetails?.work_place_id}</>
                        ) : (
                            <>Hub: {userDetails?.work_place_id}</>
                        )}
                    </h3>
                </div>
            </div>
            <div>
                <div className="flex flex-col mt-8">
                    <StaffDisplay work_place_id={userDetails?.work_place_id} work_place_type={work_place_type}/>
                </div>
            </div>
        </div>
    </>
  );
};

  
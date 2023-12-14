"use client";

import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

export default function OfficeHome() {
  const { supabaseClient } = useSessionContext();

  const router = useRouter();

  const { userDetails, user } = useUser();

  return (
    <div>
      <button
        onClick={async () => {
          await supabaseClient.auth.signOut();
          router.push("/sign-in");
        }}
      >
        LogOut
      </button>
      <div className="mt-5">
        {userDetails?.full_name} - {userDetails?.role}
      </div>
    </div>
  );
}

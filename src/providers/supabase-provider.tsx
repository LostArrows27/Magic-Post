"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { Database } from "@/types/supabase-type";
// import { Database } from "@/types/supabaseTypes";

interface SupabaseProviderProps {
  children: React.ReactNode;
}

function SupabaseProvider({ children }: SupabaseProviderProps) {
  const [supabaseClient, setSupabaseClient] = useState(
    () => createClientComponentClient<Database>() //TODO: add type
  );

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  );
}

export default SupabaseProvider;

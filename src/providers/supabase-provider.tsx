"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
// import { Database } from "@/types/supabaseTypes";

interface SupabaseProviderProps {
  children: React.ReactNode;
}


function SupabaseProvider({ children }: SupabaseProviderProps) {
  const [supabaseClient, setSupabaseClient] = useState(() =>
    createClientComponentClient() //TODO: add type
  );
 
  return (
    <SessionContextProvider supabaseClient={supabaseClient} >
      {children}
    </SessionContextProvider>
  );
}

export default SupabaseProvider;
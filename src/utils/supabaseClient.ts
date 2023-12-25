import { Database } from "@/types/supabase-type";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export function useSupabase() {
  return useSupabaseClient<Database>();
}

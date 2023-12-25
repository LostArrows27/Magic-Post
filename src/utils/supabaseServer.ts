import { Database } from "@/types/supabase-type";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { createFetch } from "@/utils/cache";

export function supabaseServer() {
  return createServerComponentClient<Database>(
    { cookies },
    {
      options: {
        global: {
          fetch: createFetch({
            cache: "no-store",
          }),
        },
      },
    }
  );
}

export type SupabaseServer = ReturnType<typeof supabaseServer>;

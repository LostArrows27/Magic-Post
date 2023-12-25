import SupabaseProvider from "@/providers/supabase-provider";
import UserProvider from "@/providers/user-provider";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import VietnamGeographyProvider from "@/providers/vietnam-geography-provider";
import ModalProviders from "@/providers/modals-provider";
import { redirect } from "next/navigation";
import { Location, Staff, StaffData } from "@/types/supabase-table-type";
import { Database } from "@/types/supabase-type";
import { supabaseServer } from "@/utils/supabaseServer";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabaseClient = supabaseServer();

  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  // if (!user) return redirect("/sign-in");

  const { data, error } = await supabaseClient
    .from("staffs")
    .select("*, locations!staffs_work_place_id_fkey(*)")
    .eq("id", user!.id)
    .returns<StaffData[]>();

  if (error) return redirect("/sign-in");

  return (
    <VietnamGeographyProvider>
      <SupabaseProvider>
        <UserProvider userDetails={data![0]}>
          <ModalProviders />
          <Header userDetails={data![0]} />
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto overflow-x-hidden pt-16">
              {children}
            </main>
          </div>
        </UserProvider>
      </SupabaseProvider>
    </VietnamGeographyProvider>
  );
}

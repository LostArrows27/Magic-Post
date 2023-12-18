import SupabaseProvider from "@/providers/supabase-provider";
import UserProvider from "@/providers/user-provider";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import VietnamGeographyProvider from "@/providers/vietnam-geography-provider";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <VietnamGeographyProvider>
      <SupabaseProvider>
        <UserProvider>
          {/* <main className="w-full h-full">{children}</main> */}
          <Header />
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto bg-muted overflow-x-hidden p-9 pt-[100px]">
              <div className="w-full bg-white rounded-lg box-content">
                {children}
              </div>
            </main>
          </div>
        </UserProvider>
      </SupabaseProvider>
    </VietnamGeographyProvider>
  );
}

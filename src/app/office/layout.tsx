import SupabaseProvider from "@/providers/supabase-provider";
import UserProvider from "@/providers/user-provider";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SupabaseProvider>
      <UserProvider>
        {/* <main className="w-full h-full">{children}</main> */}
        <>
            <Header />
            <div className="flex h-screen overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto overflow-x-hidden pt-16">
                    {children}
                </main>
            </div>
        </>
      </UserProvider>
    </SupabaseProvider>
  );
}

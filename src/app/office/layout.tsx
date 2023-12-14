import SupabaseProvider from "@/providers/supabase-provider";
import UserProvider from "@/providers/user-provider";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SupabaseProvider>
      <UserProvider>
        <main className="w-full h-full">{children}</main>
      </UserProvider>
    </SupabaseProvider>
  );
}

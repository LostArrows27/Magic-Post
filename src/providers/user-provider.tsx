"use client";
import { MyUserContextProvider } from "@/hooks/useUser";
import { Staff, StaffData } from "@/types/supabase-table-type";

interface UserProviderProps {
  children: React.ReactNode;
  userDetails: StaffData;
}

const UserProvider = ({ children, userDetails }: UserProviderProps) => {
  return (
    <MyUserContextProvider userDetails={userDetails}>
      {children}
    </MyUserContextProvider>
  );
};

export default UserProvider;

import { createContext, useContext, useEffect, useState } from "react";
import {
  useSessionContext,
  useUser as useSupaUser,
} from "@supabase/auth-helpers-react";
import { UserContextType, UserSystem } from "@/types/user-context-type";
import { Location, Staff, StaffData } from "@/types/supabase-table-type";

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  [propName: string]: any;
}

export const MyUserContextProvider = ({
  userDetails,
  children,
}: {
  userDetails: StaffData;
  children: React.ReactNode;
}) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();

  const user = useSupaUser() as UserSystem | null;

  const accessToken = session?.access_token ?? null;
  const [workLocation, setWorkLocation] = useState<Location | null>(
    userDetails?.locations
  );

  const [userData, setUserData] = useState<Staff | null>(() => {
    const { locations, ...rest } = userDetails;
    return rest;
  });

  const value: UserContextType = {
    accessToken,
    workLocation,
    userDetails: userData,
    user,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserContextProvider");
  }

  return context;
};

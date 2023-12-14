import { createContext, useContext, useEffect, useState } from "react";
import {
  useSessionContext,
  useUser as useSupaUser,
} from "@supabase/auth-helpers-react";
import { Staff } from "@/types/supabase-table-type";
import { UserContextType, UserSystem } from "@/types/user-context-type";

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();

  const user = useSupaUser() as UserSystem | null;

  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<Staff | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (user && !isLoadingData && !userDetails) {
        setIsLoadingData(true);
        const userDetail = await supabase
          .from("staffs")
          .select("*")
          .eq("id", user.id)
          .single();
        setUserDetails(userDetail.data);
        setIsLoadingData(false);
      }
    };

    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoadingUser]);

  const value: UserContextType = {
    role: user?.user_metadata.type,
    accessToken,
    userDetails,
    user,
    isLoading: isLoadingData,
  };

  return <UserContext.Provider value={value} {...props}></UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserContextProvider");
  }

  return context;
};

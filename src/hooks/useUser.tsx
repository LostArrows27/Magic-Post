import { User } from "@supabase/auth-helpers-nextjs";
import { createContext, useContext, useEffect, useState } from "react";
import {
  useSessionContext,
  useUser as useSupaUser,
} from "@supabase/auth-helpers-react";


type UserContextType = {
  accessToken: string | null;
  user: User | null;
  isLoading: boolean;
};

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

  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsLoadingData] = useState(false);

  useEffect(() => {
   //TODO: fetch userDetails
 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoadingUser]);

  const value: UserContextType = {
    accessToken,
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

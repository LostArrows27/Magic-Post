import { User } from "@supabase/supabase-js";
import { Province, District } from "./geometry-type";
import { Location, Role, Staff } from "./supabase-table-type";

type UserSystem = Omit<User, "user_metadata"> & {
  user_metadata: {
    type: Role;
    province?: Province;
    district?: District;
  };
};

type UserContextType = {
  accessToken: string | null;
  user: UserSystem | null;
  workLocation: Location | null;
  userDetails: Staff | null;
};

export type { UserContextType, UserSystem };

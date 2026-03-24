import { useSession } from "@clerk/clerk-react";
import { useMemo } from "react";
import { getSupabaseClient } from "../lib/supabase";

export const useSupabase = () => {
  const { session } = useSession();

  return useMemo(() => {
    if (!session) return null;

    // The getToken argument matches the name of the JWT template we created in Clerk
    return async () => {
      const supabaseAccessToken = await session.getToken({
        template: "equinox",
      });
      return getSupabaseClient(supabaseAccessToken);
    };
  }, [session]);
};

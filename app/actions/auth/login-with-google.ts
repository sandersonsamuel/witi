"use server";

import { createClient } from "@/lib/supabase/server";

export const loginWithGoogle = async () => {
  const supabase = await createClient();
  return supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
    },
  });
};

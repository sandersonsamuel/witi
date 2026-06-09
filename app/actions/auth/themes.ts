"use server";

import { Theme } from "@/@types/theme";
import { createClient } from "@/lib/supabase/server";

export const getThemes = async () => {
  const supabase = await createClient();

  const { data } = await supabase.from("themes").select("*");
  return data as unknown as Theme[];
};

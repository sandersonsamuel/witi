"use server";

import { Theme } from "@/@types/theme";
import { ThemeWords } from "@/@types/theme-words";
import { createClient } from "@/lib/supabase/server";

export const getThemeWords = async (theme: string) => {
  const supabase = await createClient();

  const { data } = await supabase
    .from("theme_words")
    .select("*")
    .eq("theme_id", theme);
  return data as unknown as ThemeWords[];
};

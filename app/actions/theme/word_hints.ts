"use server";

import { WordHints } from "@/@types/word-hints";
import { createClient } from "@/lib/supabase/server";

export const getWordHints = async (word: string) => {
  const supabase = await createClient();

  const { data } = await supabase
    .from("word_hints")
    .select("*")
    .eq("word_id", word);
  return data as unknown as WordHints[];
};

import { getThemeWords } from "@/app/actions/theme/theme-words";
import { useQuery } from "@tanstack/react-query";

export const useThemeWords = (theme: string | null) => {
  return useQuery({
    queryKey: ["theme-words", "themes", theme],
    queryFn: () => getThemeWords(theme!),
    enabled: !!theme,
  });
};

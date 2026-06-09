import { getThemes } from "@/app/actions/auth/themes";
import { useQuery } from "@tanstack/react-query";

export const useThemes = () => {
  return useQuery({
    queryKey: ["themes"],
    queryFn: getThemes,
  });
};

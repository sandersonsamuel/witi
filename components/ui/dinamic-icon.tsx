import * as Icons from "lucide-react";
import type { LucideProps } from "lucide-react";

// Safelist for dynamically-applied Tailwind color classes from DB
// prettier-ignore
export const TAILWIND_SAFELIST = [
  "text-pink-400","text-cyan-400","text-green-400","text-amber-400",
  "text-orange-400","text-violet-400","text-indigo-400","text-teal-400",
  "bg-pink-900/40","bg-cyan-900/40","bg-green-900/40","bg-amber-900/40",
  "bg-orange-900/40","bg-violet-900/40","bg-indigo-900/40","bg-teal-900/40",
  "ring-pink-400","ring-cyan-400","ring-green-400","ring-amber-400",
  "ring-orange-400","ring-violet-400","ring-indigo-400","ring-teal-400",
  "outline-pink-400","outline-cyan-400","outline-green-400","outline-amber-400",
  "outline-orange-400","outline-violet-400","outline-indigo-400","outline-teal-400",
];

export function DynamicIcon({
  name,
  ...props
}: { name: string } & LucideProps) {
  const Icon = (Icons[name as keyof typeof Icons] ??
    Icons.Circle) as React.FC<LucideProps>;
  return <Icon {...props} />;
}

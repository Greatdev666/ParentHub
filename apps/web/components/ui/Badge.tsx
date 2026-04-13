import { cn } from "./cn";
type BadgeProps = { children: React.ReactNode; variant?: "default" | "teal" | "orange"; className?: string };
const colors = { default: "bg-brand-navy/10 text-brand-navy", teal: "bg-brand-teal/10 text-brand-teal", orange: "bg-brand-orange/10 text-brand-orange" };
export function Badge({ children, variant = "default", className }: BadgeProps) {
  return <span className={cn("inline-block rounded-full px-3 py-1 text-xs font-medium", colors[variant], className)}>{children}</span>;
}

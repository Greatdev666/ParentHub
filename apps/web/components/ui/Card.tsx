import { cn } from "./cn";

export function Card({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-2xl bg-white dark:bg-brand-dark-card shadow-sm dark:shadow-card-dark border border-brand-navy/5 dark:border-brand-dark-border overflow-hidden transition-shadow hover:shadow-md", className)} {...props}>{children}</div>;
}

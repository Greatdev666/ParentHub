import { cn } from "./cn";
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost"; size?: "sm" | "md" | "lg" };
const variants = { primary: "bg-brand-teal text-white hover:bg-brand-teal/90", secondary: "bg-brand-orange text-white hover:bg-brand-orange/90", ghost: "bg-transparent text-brand-navy hover:bg-brand-navy/5" };
const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-5 py-2.5 text-base", lg: "px-7 py-3 text-lg" };
export function Button({ variant = "primary", size = "md", className, ...props }: ButtonProps) {
  return <button className={cn("rounded-full font-medium transition-colors", variants[variant], sizes[size], className)} {...props} />;
}

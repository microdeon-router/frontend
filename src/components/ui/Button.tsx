import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "line";

const styles: Record<Variant, string> = {
  primary:
    "bg-signal text-white hover:bg-signal-hover border border-transparent",
  ghost: "text-[#d0d0d0] hover:text-white",
  line: "border border-line text-[#d0d0d0] hover:border-[#3a3a3a] hover:text-white bg-transparent",
};

type Props = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
} & (
  | ({ to: string } & Omit<React.ComponentProps<typeof Link>, "to" | "className" | "children">)
  | ({ to?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>)
);

export default function Button({ variant = "primary", className, children, ...rest }: Props) {
  const cls = cn(
    "inline-flex items-center justify-center rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors",
    styles[variant],
    className,
  );
  if ("to" in rest && rest.to) {
    const { to, ...linkRest } = rest;
    return (
      <Link to={to} className={cls} {...linkRest}>
        {children}
      </Link>
    );
  }
  const buttonRest = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={buttonRest.type ?? "button"} className={cls} {...buttonRest}>
      {children}
    </button>
  );
}

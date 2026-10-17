import { cn } from "@/lib/cn";

export default function VendorMark({
  src,
  name,
  className,
}: {
  src: string;
  name: string;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={name}
      title={name}
      className={cn("h-8 w-8 object-contain", className)}
    />
  );
}

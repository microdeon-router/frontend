export default function Mark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <img
      src="/brand/microdeon/mark.png"
      alt=""
      className={className}
      width={28}
      height={28}
    />
  );
}

export function Wordmark({ className = "h-8" }: { className?: string }) {
  return (
    <img
      src="/brand/microdeon/logo-wordmark-trim.png"
      alt="Microdeon"
      className={className}
      height={32}
    />
  );
}

import { Heart } from "lucide-react";

interface CemiIconProps {
  className?: string;
  showText?: boolean;
}

export function CemiIcon({ className = "", showText = true }: CemiIconProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-[] shadow-lg">
        <Heart
          className="h-7 w-7 text-primary-foreground"
          fill="currentColor"
        />
        <div className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-accent" />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className="text-2xl font-bold tracking-tight text-foreground">
            Clínica Cemi
          </span>
        </div>
      )}
    </div>
  );
}

import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => (
  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", className)}>
    <Sparkles className="w-5 h-5 text-accent animate-pulse" />
  </div>
);

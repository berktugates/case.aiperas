import { cn } from "@/lib/utils";
import { StatusDotProps } from "../types/chat";

export const StatusDot = ({ isStreaming }: StatusDotProps) => (
  <span 
    className={cn(
      "w-1.5 h-1.5 rounded-full transition-all duration-300", 
      isStreaming ? "bg-green-500 animate-pulse" : "bg-foreground/20"
    )} 
  />
);

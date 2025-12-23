import { User, Bot } from 'lucide-react';
import { cn } from "@/lib/utils";
import { AvatarProps } from "../types/chat";

export const Avatar = ({ role }: AvatarProps) => {
  return (
    <div className={cn(
      "w-8 h-8 md:w-9 md:h-9 rounded-full shrink-0 flex items-center justify-center text-[10px] md:text-xs font-bold",
      role === 'user' 
        ? "bg-zinc-700/80 text-white border border-zinc-600/50" 
        : "bg-indigo-950/40 text-accent border border-indigo-500/20 shadow-[0_0_15px_rgba(79,70,229,0.1)]"
    )}>
      {role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-accent" />}
    </div>
  );
};

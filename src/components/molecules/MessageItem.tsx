import { AlertCircle } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Avatar } from "./Avatar";
import { MessageItemProps } from "../types/chat";

export const MessageItem = ({ message }: MessageItemProps) => {
  const isUser = message.role === 'user';

  return (
    <div className={cn(
      "flex w-full animate-fade-in gap-3 md:gap-4",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "flex max-w-[85%] md:max-w-[75%] gap-3",
        isUser ? "flex-row-reverse" : "flex-row"
      )}>
        <Avatar role={message.role} />
        
        <div className={cn(
          "relative px-4 py-3 md:px-5 md:py-3.5 rounded-2xl md:rounded-[22px] leading-relaxed text-[15px] transition-all",
          isUser 
            ? "bg-zinc-800/60 backdrop-blur-md border border-zinc-700/50 text-white rounded-tr-none shadow-xl" 
            : "bg-indigo-950/30 backdrop-blur-md border border-indigo-500/20 text-foreground/90 rounded-tl-none shadow-[0_0_20px_rgba(79,70,229,0.05)]"
        )}>
          <div className="whitespace-pre-wrap break-words">
            {message.content}
            {message.status === 'streaming' && (
              <span className="inline-block w-1.5 h-4 ml-1 bg-accent/60 animate-blink align-middle" />
            )}
          </div>
          
          {message.status === 'error' && (
            <div className="flex items-center gap-1.5 mt-2 text-xs text-red-400 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              Connection lost
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { IconButton } from "../atoms/IconButton";
import { FooterBranding } from "../molecules/FooterBranding";
import { ChatInputAreaProps } from "../types/chat";

export const ChatInputArea = ({ isStreaming, onSendMessage }: ChatInputAreaProps) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isStreaming) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <footer className="p-4 md:p-6 pb-8 md:pb-10">
      <div className="max-w-3xl mx-auto relative group">
        <form 
          onSubmit={handleSubmit}
          className={cn(
            "glass px-4 py-2 md:px-5 md:py-2.5 flex items-center gap-3 transition-all border-white/10 group-focus-within:border-accent/30 group-focus-within:shadow-2xl group-focus-within:shadow-accent/5",
            isStreaming && "opacity-80"
          )}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isStreaming ? "AI is processing..." : "Message AI..."}
            disabled={isStreaming}
            className="flex-1 bg-transparent py-2.5 outline-none text-[15px] placeholder:text-foreground/30 disabled:cursor-not-allowed"
          />
          <IconButton 
            type="submit" 
            disabled={isStreaming || !input.trim()} 
            icon={isStreaming ? Loader2 : Send}
            variant={isStreaming || !input.trim() ? 'default' : 'accent'}
            className={cn(isStreaming && "animate-spin")}
          />
        </form>
        <FooterBranding />
      </div>
    </footer>
  );
};

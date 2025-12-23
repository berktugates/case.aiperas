import { Trash2 } from "lucide-react";
import { Logo } from "../atoms/Logo";
import { IconButton } from "../atoms/IconButton";
import { ChatHeaderInfo } from "../molecules/ChatHeaderInfo";
import { ChatHeaderProps } from "../types/chat";

export const ChatHeader = ({ isStreaming, onClear }: ChatHeaderProps) => (
  <header className="flex items-center justify-between px-6 py-4 mt-4 mx-4 glass z-10 transition-all duration-300">
    <div className="flex items-center gap-3">
      <Logo />
      <ChatHeaderInfo title="AI Assistant" isStreaming={isStreaming} />
    </div>
    <IconButton 
      icon={Trash2} 
      variant="danger" 
      onClick={onClear} 
      title="Clear History"
      iconColor="#b3c3ee"
    />
  </header>
);

export type MessageRole = 'user' | 'ai';
export type MessageStatus = 'streaming' | 'done' | 'error';
import { LucideIcon } from "lucide-react";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  status: MessageStatus;
  lastIndex?: number;
  timestamp: number;
}

export interface ChatStore {
  messages: Message[];
  isStreaming: boolean;
  currentStreamingId: string | null;
  
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  updateMessage: (id: string, updates: Partial<Message>) => void;
  setIsStreaming: (isStreaming: boolean) => void;
  setCurrentStreamingId: (id: string | null) => void;
  clearHistory: () => void;
}

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  variant?: 'default' | 'danger' | 'accent';
  iconColor?: string;
}

export interface StatusDotProps {
  isStreaming: boolean;
}

export interface AvatarProps {
  role: MessageRole;
}

export interface ChatHeaderInfoProps {
  title: string;
  isStreaming: boolean;
}

export interface MessageItemProps {
  message: Message;
}

export interface ChatHeaderProps {
  isStreaming: boolean;
  onClear: () => void;
}

export interface ChatInputAreaProps {
  isStreaming: boolean;
  onSendMessage: (text: string) => void;
}

export interface MessageListProps {
  messages: Message[];
}
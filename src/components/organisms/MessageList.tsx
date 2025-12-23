import { useRef, useEffect } from "react";
import { MessageItem } from "../molecules/MessageItem";
import { MessageListProps } from "../types/chat";

export const MessageList = ({ messages }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-6 py-8 scrollbar-thin flex flex-col gap-6">
      {messages.map((m) => (
        <MessageItem key={m.id} message={m} />
      ))}
      <div ref={messagesEndRef} className="h-4" />
    </div>
  );
};

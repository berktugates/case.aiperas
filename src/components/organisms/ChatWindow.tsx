'use client';

import React, { useEffect, useState } from 'react';
import { useChat } from '@/hooks/useChat';
import { ChatHeader } from './ChatHeader';
import { MessageList } from './MessageList';
import { ChatInputArea } from './ChatInputArea';

export const ChatWindow: React.FC = () => {
  const { messages, isStreaming, sendMessage, clearHistory } = useChat();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto w-full relative overflow-visible">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-[500px] bg-accent/10 blur-[150px] -z-10 rounded-full opacity-50 pointer-events-none" />      
      {isStreaming && (
        <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
          <div className="absolute top-0 left-0 h-full w-[12vw] bg-gradient-to-r from-blue-500/20 via-purple-500/10 to-transparent blur-[60px] md:blur-[100px] animate-pulse-slow" />
          <div className="absolute top-0 right-0 h-full w-[12vw] bg-gradient-to-l from-blue-500/20 via-purple-500/10 to-transparent blur-[60px] md:blur-[100px] animate-pulse-slow" />
        </div>
      )}

      <ChatHeader isStreaming={isStreaming} onClear={clearHistory} />

      <main className="flex-1 overflow-hidden flex flex-col">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-4 animate-fade-in">
            <h2 className="text-2xl font-bold mb-3 tracking-tight">How can I help you today?</h2>
            <p className="text-foreground/50 max-w-sm leading-relaxed">
              Start a conversation with our AI. It supports streaming responses and remembers where you left off.
            </p>
          </div>
        ) : (
          <MessageList messages={messages} />
        )}
      </main>

      <ChatInputArea isStreaming={isStreaming} onSendMessage={sendMessage} />
    </div>
  );
};

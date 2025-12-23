'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useChat } from '@/hooks/useChat';
import { Send, Trash2, Sparkles, Loader2, User, Bot, AlertCircle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Chat: React.FC = () => {
  const { messages, isStreaming, sendMessage, clearHistory } = useChat();
  const [input, setInput] = useState('');
  const [mounted, setMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (mounted) scrollToBottom();
  }, [messages, mounted]);

  if (!mounted) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isStreaming) {
      sendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-5xl mx-auto w-full relative bg-transparent overflow-hidden font-sans">
      <div className="fixed inset-0 bg-[#020617] -z-20" />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/20 blur-[120px] rounded-full animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full animate-pulse-slow pointer-events-none" />
      
      {isStreaming && (
        <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
          <div className="absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b from-transparent via-accent to-transparent opacity-50 blur-[2px]" />
          <div className="absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b from-transparent via-accent to-transparent opacity-50 blur-[2px]" />
        </div>
      )}

      <header className="flex items-center justify-between px-8 py-5 mt-6 mx-6 glass z-10 transition-all duration-500 hover:border-accent/20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center shadow-lg shadow-accent/20">
            <Sparkles className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white/90">AIPERAS AI</h1>
            <p className="text-[11px] text-slate-400 font-medium flex items-center gap-2 tracking-wider uppercase">
              {isStreaming ? "Processing Audio-Stream" : "Neural Network Active"}
              <span className={cn("w-2 h-2 rounded-full", isStreaming ? "bg-green-400 animate-pulse shadow-[0_0_8px_#4ade80]" : "bg-slate-700")} />
            </p>
          </div>
        </div>
        <button 
          onClick={clearHistory}
          className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-red-400 transition-all active:scale-90 border border-white/5 hover:border-red-400/20"
          title="Clear Encrypted Session"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-6 md:px-10 py-10 scrollbar-thin flex flex-col gap-8 scroll-smooth">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-4 animate-slide-up">
            <div className="w-20 h-20 rounded-3xl bg-accent/10 flex items-center justify-center mb-8 border border-accent/20">
              <Bot className="w-10 h-10 text-accent" />
            </div>
            <h2 className="text-3xl font-extrabold mb-4 tracking-tight text-white">Neural Interface Ready</h2>
            <p className="text-slate-400 max-w-md leading-relaxed text-lg">
              Saniyede bir parça akış sağlayan, tam kesintisiz ve akıllı asistan ile görüşmeye başlayın.
            </p>
            <div className="flex gap-4 mt-8">
              <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-slate-400">20s Streaming</div>
              <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-slate-400">Resumable State</div>
              <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-slate-400">NestJS Backend</div>
            </div>
          </div>
        ) : (
          messages.map((m, idx) => (
            <div 
              key={m.id} 
              className={cn(
                "flex w-full animate-slide-up gap-4",
                m.role === 'user' ? "justify-end" : "justify-start"
              )}
            >
              <div className={cn(
                "flex max-w-[88%] md:max-w-[80%] gap-4",
                m.role === 'user' ? "flex-row-reverse" : "flex-row"
              )}>
                <div className={cn(
                  "w-10 h-10 rounded-2xl shrink-0 flex items-center justify-center shadow-md",
                  m.role === 'user' 
                    ? "bg-slate-800 text-white border border-slate-700" 
                    : "bg-accent/20 text-accent border border-accent/30"
                )}>
                  {m.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>
                <div className={cn(
                  "relative px-5 py-4 rounded-[24px] leading-relaxed text-[15px] transition-all duration-300",
                  m.role === 'user' 
                    ? "bg-message-user text-white rounded-tr-none shadow-xl shadow-indigo-500/10 border border-white/10" 
                    : "glass text-slate-200 rounded-tl-none border-white/5"
                )}>
                  <div className="whitespace-pre-wrap break-words font-medium">
                    {m.content}
                    {m.status === 'streaming' && (
                      <span className="inline-block w-2 h-5 ml-1 bg-accent animate-blink align-middle shadow-[0_0_8px_#6366f1]" />
                    )}
                  </div>
                  
                  {m.status === 'error' && (
                    <div className="flex items-center gap-2 mt-3 text-xs text-red-400 font-bold bg-red-400/10 px-3 py-1.5 rounded-lg border border-red-400/20">
                      <AlertCircle className="w-4 h-4" />
                      Hata: Bağlantı kesildi. Tekrar deneniyor...
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} className="h-10" />
      </div>

      <footer className="p-6 md:p-10">
        <div className="max-w-4xl mx-auto relative group">
          <form 
            onSubmit={handleSubmit}
            className={cn(
              "glass p-2 pr-3 flex items-center gap-3 transition-all duration-500 border-white/5 active:border-accent/40 focus-within:border-accent/40 focus-within:shadow-[0_0_40px_rgba(99,102,241,0.1)]",
              isStreaming && "opacity-60 grayscale-[0.5]"
            )}
          >
            <div className="flex-1 flex items-center px-4">
               <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isStreaming ? "AI Veri İşliyor..." : "Bir mesaj yazın..."}
                disabled={isStreaming}
                className="flex-1 bg-transparent py-4 outline-none text-[16px] text-white placeholder:text-slate-500 disabled:cursor-not-allowed font-medium"
              />
            </div>
            <button 
              type="submit" 
              disabled={isStreaming || !input.trim()} 
              className={cn(
                "w-14 h-14 rounded-2xl transition-all flex items-center justify-center shrink-0 active:scale-90",
                isStreaming || !input.trim() 
                  ? "bg-slate-800/50 text-slate-600 cursor-not-allowed" 
                  : "bg-accent text-white shadow-lg shadow-accent/40 hover:shadow-accent/60 hover:-translate-y-1"
              )}
            >
              {isStreaming ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <Send className="w-6 h-6" />
              )}
            </button>
          </form>
          
          <div className="mt-6 flex flex-col items-center gap-2 opacity-30 select-none pointer-events-none">
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-slate-500" />
              <p className="text-[10px] uppercase tracking-[0.4em] font-black text-slate-400">
                AIPERAS NEURAL CORE
              </p>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-slate-500" />
            </div>
          </div>
        </div>
      </footer>
    </div>

  );
};

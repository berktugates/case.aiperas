import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Message, ChatStore } from '@/types/chat';

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      messages: [],
      isStreaming: false,
      currentStreamingId: null,

      setMessages: (messages: Message[]) => set({ messages }),
      addMessage: (message: Message) => set((state: ChatStore) => ({ 
        messages: [...state.messages, message] 
      })),
      updateMessage: (id: string, updates: Partial<Message>) => set((state: ChatStore) => ({
        messages: state.messages.map((m: Message) => (m.id === id ? { ...m, ...updates } : m)),
      })),
      setIsStreaming: (isStreaming: boolean) => set({ isStreaming }),
      setCurrentStreamingId: (id: string | null) => set({ currentStreamingId: id }),
      clearHistory: () => set({ messages: [], isStreaming: false, currentStreamingId: null }),
    }),
    {
      name: 'chat-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state: ChatStore) => ({ messages: state.messages }),
    }
  )
);

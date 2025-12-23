'use client';
import { useCallback, useRef, useEffect } from 'react';
import { useChatStore } from '@/store/useChatStore';
import { Message } from '@/types/chat';

export function useChat() {
  const {
    messages,
    isStreaming,
    addMessage,
    updateMessage,
    setIsStreaming,
    setCurrentStreamingId,
    clearHistory,
  } = useChatStore();

  const activeStreamRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.role === 'ai' && lastMessage.status === 'streaming' && !activeStreamRef.current) {
      const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
      if (lastUserMessage) {
        resumeStream(lastUserMessage.content, lastMessage.id, lastMessage.lastIndex ?? -1);
      }
    }
  }, []);

  const streamResponse = async (messageText: string, aiMessageId: string, fromIndex = -1) => {
    if (activeStreamRef.current) {
      activeStreamRef.current.abort();
    }

    const controller = new AbortController();
    activeStreamRef.current = controller;
    setIsStreaming(true);
    setCurrentStreamingId(aiMessageId);

    try {
      const response = await fetch('http://localhost:3001/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText, lastIndex: fromIndex }),
        signal: controller.signal,
      });

      if (!response.ok) throw new Error('Stream request failed');
      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader found');

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.trim() || !line.startsWith('data: ')) continue;
          
          const dataString = line.slice(6);
          try {
            const data = JSON.parse(dataString);

            if (data.done) {
              updateMessage(aiMessageId, { status: 'done', lastIndex: 20 });
              setIsStreaming(false);
              setCurrentStreamingId(null);
            } else if (data.chunk) {
              const currentMsg = useChatStore.getState().messages.find((m: Message) => m.id === aiMessageId);
              if (currentMsg) {
                if (data.index <= (currentMsg.lastIndex ?? -1)) {
                  return;
                }

                updateMessage(aiMessageId, {
                  content: currentMsg.content + data.chunk,
                  lastIndex: data.index,
                  status: 'streaming'
                });
              }
            }
          } catch (e) {
            console.error('Failed to parse SSE line:', line, e);
          }
        }
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('Stream manually aborted');
      } else {
        console.error('Streaming error:', error);
        updateMessage(aiMessageId, { status: 'error' });
        setIsStreaming(false);
        setCurrentStreamingId(null);
      }
    } finally {
      activeStreamRef.current = null;
    }
  };

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isStreaming) return;

    const userMessage: Message = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: text,
      status: 'done',
      timestamp: Date.now(),
    };

    const aiMessage: Message = {
      id: `a-${Date.now()}`,
      role: 'ai',
      content: '',
      status: 'streaming',
      lastIndex: -1,
      timestamp: Date.now() + 1,
    };

    addMessage(userMessage);
    addMessage(aiMessage);
    
    await streamResponse(text, aiMessage.id);
  }, [isStreaming, addMessage, streamResponse]);

  const resumeStream = (text: string, aiMessageId: string, lastIndex: number) => {
    streamResponse(text, aiMessageId, lastIndex);
  };

  const clear = useCallback(() => {
    if (activeStreamRef.current) {
      activeStreamRef.current.abort();
    }
    clearHistory();
  }, [clearHistory]);

  return {
    messages,
    isStreaming,
    sendMessage,
    clearHistory: clear
  };
}

import { StatusDot } from "../atoms/StatusDot";
import { ChatHeaderInfoProps } from "../types/chat";

export const ChatHeaderInfo = ({ title, isStreaming }: ChatHeaderInfoProps) => (
  <div className="flex flex-col">
    <h1 className="text-lg font-semibold tracking-tight leading-tight">{title}</h1>
    <div className="flex items-center gap-x-1.5">
      <span className="text-xs text-foreground/50">
        {isStreaming ? "Streaming response" : "Ready to help"}
      </span>
      <StatusDot isStreaming={isStreaming} />
    </div>
  </div>
);

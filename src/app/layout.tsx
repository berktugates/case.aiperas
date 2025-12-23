import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "aiperas case",
  description: "A streaming, resumable AI chat interface built with Next.js.",
  keywords: ["AI", "Chat", "Streaming", "SSE", "Next.js", "Resumable"],
};

import { CustomCursor } from "@/components/atoms/CustomCursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <style>{`
          * { cursor: none !important; }
        `}</style>
      </head>
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}

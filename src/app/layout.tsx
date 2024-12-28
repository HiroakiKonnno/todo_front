"use client";

import { queryClient } from "@/lib/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { FlashMessageProvider } from "./context/FlashMessageContext";

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FlashMessageProvider>
      <html lang="ja">
        <body>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </body>
      </html>
    </FlashMessageProvider>
  );
}

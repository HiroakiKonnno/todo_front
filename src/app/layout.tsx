"use client";

import { queryClient } from "@/lib/client";
import { QueryClientProvider } from "@tanstack/react-query";

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}

"use client";

import { queryClient } from "@/lib/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { FlashMessageProvider } from "./context/FlashMessageContext";
import { Provider } from "react-redux";
import store from "./store";

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <FlashMessageProvider>
        <html lang="ja">
          <body>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </body>
        </html>
      </FlashMessageProvider>
    </Provider>
  );
}

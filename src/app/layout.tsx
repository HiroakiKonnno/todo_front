"use client";

import { queryClient } from "@/lib/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { FlashMessageProvider } from "./context/FlashMessageContext";
import { Provider, useDispatch as useReduxDispatch } from "react-redux";
import store, { AppDispatch } from "./store";
import { useEffect } from "react";
import { fetchUserIfNeeded } from "./store/userSlice";

function AppInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useReduxDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUserIfNeeded());
  }, [dispatch]);

  return <>{children}</>;
}

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
              <AppInitializer>{children}</AppInitializer>
            </QueryClientProvider>
          </body>
        </html>
      </FlashMessageProvider>
    </Provider>
  );
}

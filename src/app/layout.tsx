"use client";

import { queryClient } from "@/lib/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { FlashMessageProvider } from "./context/FlashMessageContext";
import {
  Provider,
  useDispatch as useReduxDispatch,
  useSelector,
} from "react-redux";
import store, { AppDispatch, RootState } from "./store";
import { useEffect, useState } from "react";
import { fetchUserIfNeeded } from "./store/userSlice";
import "./styles/global.css";
import { usePathname, useRouter } from "next/navigation";

function AppInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useReduxDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      await dispatch(fetchUserIfNeeded());
      setLoading(false);
    };
    fetchUser();
  }, [dispatch]);

  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    console.log(pathname);
    if (!loading && !user && pathname !== "/signup") {
      router.push("/");
    }
  }, [user, router, loading, pathname]);

  if (loading) {
    return <div>Loading...</div>;
  }

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

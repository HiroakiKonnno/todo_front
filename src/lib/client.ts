import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3, // 失敗時の自動リトライ回数
      refetchOnWindowFocus: false, // ウィンドウがフォーカスされたときに再フェッチしない
      staleTime: 1000 * 60 * 5, // 5分間はキャッシュを保持
    },
  },
});

"use client";

import apiClient from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export default function Welcome() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["helloworld"],
    queryFn: async () => {
      const response = await apiClient.get("/helloworld");
      return response.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>データの取得に失敗しました</p>;

  return (
    <main>
      <h1>APIからのデータ</h1>
      <pre>{data.message}</pre>
    </main>
  );
}

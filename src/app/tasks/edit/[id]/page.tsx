"use client";

import apiClient from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Header } from "@/app/componetnts/header";
import { TaskForm } from "@/app/componetnts/taskForm";

export default function TaskDetailPage() {
  const params = useParams();
  const { id } = params;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tasks", id],
    queryFn: async () => {
      const response = await apiClient.get(`/tasks/${id}`);
      return response.data;
    },
    staleTime: 0,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>データの取得に失敗しました</p>;

  return (
    <>
      <Header />
      <TaskForm
        titleData={data.title}
        contentData={data.content}
        startDateData={data.start_date}
        endDateData={data.end_date}
      />
    </>
  );
}

"use client";

import { Task } from "@/app/types/task";
import apiClient from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import styles from "../styles/todoList.module.css";
import flashStyles from "../styles/messages.module.css";
import { useFlashMessage } from "../context/FlashMessageContext";
import { Header } from "../componetnts/header";
import { Table } from "../componetnts/table";

export default function TaskList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await apiClient.get("/tasks");
      return response.data;
    },
    staleTime: 0,
  });

  const { message, type } = useFlashMessage();
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>データの取得に失敗しました</p>;

  return (
    <>
      <Header />
      {message && type && <div className={flashStyles[type]}>{message}</div>}
      <div className={styles.container}>
        <h1 className={styles.title}>Todoリスト</h1>
        <Link href={`/tasks/new`} className={styles.link}>
          <button className={styles.addButton}>作成</button>
        </Link>
        <Table tasks={data as Task[]} />
      </div>
    </>
  );
}

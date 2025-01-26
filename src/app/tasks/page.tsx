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

  const { setFlashMessage } = useFlashMessage();

  const handleExport = async () => {
    try {
      const response = await apiClient.post("/tasks/export", {
        responseType: "blob",
      });
      const blob = new Blob([response.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "tasks.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setFlashMessage("csvの出力を開始しました", "success");
    } catch {
      setFlashMessage("csvの出力に失敗しました", "fail");
    }
  };

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
        <button className={styles.addButton} onClick={() => handleExport()}>
          CSVエクスポート
        </button>
        <Table tasks={data as Task[]} />
      </div>
    </>
  );
}

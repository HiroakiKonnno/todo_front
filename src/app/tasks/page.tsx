"use client";

import { Task } from "@/app/types/task";
import apiClient from "@/lib/axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import styles from "../styles/todoList.module.css";
import flashStyles from "../styles/messages.module.css";
import { useFlashMessage } from "../context/FlashMessageContext";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Header } from "../componetnts/header";

export default function TaskList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await apiClient.get("/tasks");
      return response.data;
    },
    staleTime: 0,
  });
  const user = useSelector((state: RootState) => state.user.user);
  const { setFlashMessage } = useFlashMessage();

  const [text, setText] = useState<string>("");
  const queryClient = useQueryClient();

  const addText = (t: string) => {
    setText(t);
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
        {data.map((todo: Task) => (
          <li key={`li-${todo.id}`} className={styles.todoItem}>
            {todo.title}
            <Link href={`/tasks/edit/${todo.id}`} className={styles.link}>
              詳細
            </Link>
          </li>
        ))}
      </div>
    </>
  );
}

"use client";

import { Task } from "@/app/types/task";
import apiClient from "@/lib/axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import styles from "../styles/todoList.module.css";
import flashStyles from "../styles/messages.module.css";
import { useFlashMessage } from "../context/FlashMessageContext";

export default function TaskList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await apiClient.get("/tasks");
      return response.data;
    },
    staleTime: 0,
  });

  const [text, setText] = useState<string>("");
  const queryClient = useQueryClient();

  const addTask = async () => {
    try {
      await apiClient.post("/tasks", { title: text });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    } catch (error) {
      console.error("タスクの作成に失敗しました", error);
    }
  };

  const addText = (t: string) => {
    setText(t);
  };
  const { message } = useFlashMessage();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>データの取得に失敗しました</p>;

  return (
    <>
      {message && <div className={flashStyles.flash}>{message}</div>}
      <h1 className={styles.title}>Todoリスト</h1>
      <div>
        <input
          type="text"
          placeholder={"todoを入力してください"}
          onChange={(e) => addText(e.target.value)}
          className={styles.inputField}
        />
        <button onClick={addTask} className={styles.addButton}>
          追加
        </button>
      </div>
      {data.map((todo: Task) => (
        <li key={`li-${todo.id}`} className={styles.todoList}>
          {todo.title}
          <Link href={`/tasks/${todo.id}`} className={styles.link}>
            詳細
          </Link>
        </li>
      ))}
    </>
  );
}

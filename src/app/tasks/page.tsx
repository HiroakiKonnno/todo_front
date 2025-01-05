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

  const [text, setText] = useState<string>("");
  const queryClient = useQueryClient();

  const addTask = async () => {
    try {
      await apiClient.post("/tasks", { title: text, user_id: user?.id });
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
      <Header />
      {message && <div className={flashStyles.flash}>{message}</div>}
      <div className={styles.container}>
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
          <li key={`li-${todo.id}`} className={styles.todoItem}>
            {todo.title}
            <Link href={`/tasks/${todo.id}`} className={styles.link}>
              詳細
            </Link>
          </li>
        ))}
      </div>
    </>
  );
}

"use client";

import { Task } from "@/app/types/task";
import apiClient from "@/lib/axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function TaskList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await apiClient.get("/tasks");
      return response.data;
    },
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

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>データの取得に失敗しました</p>;

  return (
    <main>
      <h1>Todoリスト</h1>
      <div>
        <input
          type="text"
          placeholder={"todoを入力してください"}
          value={text}
          onChange={(e) => addText(e.target.value)}
        />
        <button onClick={addTask}>追加</button>
      </div>
      {data.map((todo: Task) => {
        return <li key={todo.id}>{todo.title}</li>;
      })}
    </main>
  );
}

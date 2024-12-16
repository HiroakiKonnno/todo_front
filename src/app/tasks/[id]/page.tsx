"use client";

import apiClient from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "../../styles/taskForm.module.css";

export default function TaskDetailPage() {
  const params = useParams();
  const { id } = params;
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tasks", id],
    queryFn: async () => {
      const response = await apiClient.get(`/tasks/${id}`);
      return response.data;
    },
    staleTime: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // APIにPATCHリクエストを送信
      await apiClient.patch(`/tasks/${id}`, {
        title: title,
        content: content,
      });

      alert("更新が成功しました！");
    } catch (error) {
      console.error("データの更新に失敗しました", error);
      alert("データの更新に失敗しました");
    }
  };

  const handleDelete = async () => {
    const userConfirmed = window.confirm("本当に削除しますか？");
    if (!userConfirmed) return;

    await apiClient.delete(`/tasks/${id}`);
    router.push("/tasks");
  };

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setContent(data.content);
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>データの取得に失敗しました</p>;

  return (
    <>
      <h1 className={styles.title}>タスクの詳細ページ</h1>
      <form onSubmit={handleSubmit}>
        <p className={styles.label}>タイトル</p>
        <input
          value={title != undefined ? title : data.title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.inputField}
        />
        <p className={styles.label}>内容</p>
        <input
          value={content != undefined ? content : data.content}
          onChange={(e) => setContent(e.target.value)}
          className={styles.textareaField}
        />
        <div>
          <button type="submit" className={styles.buttonPrimary}>
            更新
          </button>
        </div>
      </form>
      <button onClick={handleDelete} className={styles.buttonDanger}>
        削除
      </button>
    </>
  );
}

"use client";

import apiClient from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "../../styles/taskForm.module.css";
import { Header } from "@/app/componetnts/header";
import { useFlashMessage } from "@/app/context/FlashMessageContext";

export default function TaskDetailPage() {
  const params = useParams();
  const { id } = params;
  const router = useRouter();
  const { setFlashMessage } = useFlashMessage();

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

      setFlashMessage("更新に成功しました！");
      router.push("/tasks");
    } catch (error) {
      console.error("データの更新に失敗しました", error);
      setFlashMessage("削除に成功しました！");
      router.push("/tasks");
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
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>タスクの詳細ページ</h1>
        <form onSubmit={handleSubmit}>
          <p className={styles.label}>タイトル</p>
          <input
            value={title != undefined ? title : data.title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.inputField}
          />
          <p className={styles.label}>内容</p>
          <textarea
            value={content != undefined ? content : data.content}
            onChange={(e) => setContent(e.target.value)}
            className={styles.inputField}
          />
          <div>
            <button type="submit" className={styles.buttonPrimary}>
              更新
            </button>
            <button onClick={handleDelete} className={styles.buttonDanger}>
              削除
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

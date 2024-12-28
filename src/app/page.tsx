"use client";

import { useState } from "react";
import styles from "./styles/login.module.css";
import apiClient from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useFlashMessage } from "./context/FlashMessageContext";

export default function Welcome() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { setFlashMessage } = useFlashMessage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await apiClient.post(`/signin`, {
        login_id: loginId,
        password: password,
      });
      setFlashMessage("ログインに成功しました！");
      router.push("/tasks");
    } catch (error) {
      console.error("ログインできませんでした", error);
      alert("ログインできませんでした");
    }
  };

  return (
    <>
      <h1 className={styles.title}>ログインページ</h1>
      <form onSubmit={handleSubmit}>
        <p className={styles.label}>ユーザID</p>
        <input
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          className={styles.inputField}
        />
        <p className={styles.label}>パスワード</p>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.inputField}
        />
        <div>
          <button type="submit" className={styles.buttonPrimary}>
            ログイン
          </button>
        </div>
      </form>
    </>
  );
}

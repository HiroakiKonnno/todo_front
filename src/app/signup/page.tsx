"use client";

import { useEffect, useState } from "react";
import styles from "../styles/login.module.css";
import apiClient from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useFlashMessage } from "../context/FlashMessageContext";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/userSlice";
import { RootState } from "../store";
import flashStyles from "../styles/messages.module.css";

export default function Signup() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const { message, type, setFlashMessage } = useFlashMessage();

  useEffect(() => {
    if (user) {
      router.push("/tasks");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res: { data: { id: number; login_id: string; name: string } } =
        await apiClient.post(`/signup`, {
          login_id: loginId,
          password: password,
          name: name,
        });
      dispatch(
        login({
          id: res.data.id,
          loginId: res.data.login_id,
          name: res.data.name,
        })
      );
      setFlashMessage("ログインに成功しました！", "success");
      router.push("/tasks");
    } catch {
      setFlashMessage("ログインに失敗しました", "fail");
    }
  };

  return (
    <div className={styles.container}>
      {message && type && <div className={flashStyles[type]}>{message}</div>}
      <h1 className={styles.title}>アカウント作成</h1>
      <form onSubmit={handleSubmit}>
        <p className={styles.label}>ユーザID</p>
        <input
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          className={styles.inputField}
        />
        <p className={styles.label}>ユーザ名</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
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
            アカウント作成
          </button>
        </div>
      </form>
    </div>
  );
}

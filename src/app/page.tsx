"use client";

import { useEffect, useState } from "react";
import styles from "./styles/login.module.css";
import apiClient from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useFlashMessage } from "./context/FlashMessageContext";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./store/userSlice";
import { User } from "./types/user";
import { RootState } from "./store";

export default function Welcome() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { setFlashMessage } = useFlashMessage();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (user) {
      router.push("/tasks");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res: { data: { message: string; user: User } } =
        await apiClient.post(`/signin`, {
          login_id: loginId,
          password: password,
        });
      dispatch(
        login({
          id: res.data.user.id,
          loginId: res.data.user.login_id,
          name: res.data.user.name,
        })
      );
      setFlashMessage("ログインに成功しました！");
      router.push("/tasks");
    } catch (error) {
      console.error("ログインできませんでした", error);
      alert("ログインできませんでした");
    }
  };

  return (
    <div className={styles.container}>
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
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import styles from "./styles/signup.module.css";
import apiClient from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useFlashMessage } from "./context/FlashMessageContext";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./store/userSlice";
import { User } from "./types/user";
import { RootState } from "./store";
import flashStyles from "./styles/messages.module.css";
import Link from "next/link";

export default function Welcome() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
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
      setFlashMessage("ログインに成功しました！", "success");
      router.push("/tasks");
    } catch {
      setFlashMessage("ログインに失敗しました", "fail");
    }
  };

  return (
    <>
      <div className={styles.container}>
        {message && type && <div className={flashStyles[type]}>{message}</div>}
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
      <div className={styles.link}>
        <Link href={`/signup`} className={styles.buttonPrimary}>
          アカウント作成
        </Link>
      </div>
    </>
  );
}

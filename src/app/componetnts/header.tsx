import Link from "next/link";
import React from "react";
import styles from "../styles/header.module.css";
import apiClient from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "../store/userSlice";

export const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await apiClient.post(`/signout`);
      dispatch(logout());
      router.push("/");
    } catch (error) {
      console.error("データの更新に失敗しました", error);
    }
  };

  return (
    <header className={styles.header}>
      <span>Todoアプリ</span>
      <Link href="#" onClick={handleLogout} className={styles.logout}>
        ログアウト
      </Link>
    </header>
  );
};

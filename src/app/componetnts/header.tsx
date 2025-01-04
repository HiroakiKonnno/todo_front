import Link from "next/link";
import React from "react";
import styles from "../styles/header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <h1>
        <Link href="/">Todoアプリ</Link>
      </h1>
    </header>
  );
};

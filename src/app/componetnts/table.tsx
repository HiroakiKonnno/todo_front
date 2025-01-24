import React from "react";
import { Task } from "../types/task";
import Link from "next/link";
import styles from "../styles/table.module.css";

export const Table = ({ tasks }: { tasks: Task[] }) => {
  return (
    <div className={styles.tableContainer}>
      <table className="min-w-full">
        <thead className={styles.tableHeader}>
          <tr>
            <th className={styles.tableCell}>タイトル</th>
            <th className={styles.tableCell}>内容</th>
            <th className={styles.tableCell}>開始日</th>
            <th className={styles.tableCell}>終了日</th>
            <th className={styles.tableCell}>操作</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td className={styles.tableCell}>{task.title}</td>
              <td className={styles.tableCell}>{task.content}</td>
              <td className={styles.tableCell}>
                {new Date(task.start_date).toLocaleDateString()}
              </td>
              <td className={styles.tableCell}>
                {new Date(task.end_date).toLocaleDateString()}
              </td>
              <td className={styles.tableCell}>
                <Link href={`/tasks/edit/${task.id}`} className={styles.link}>
                  詳細
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

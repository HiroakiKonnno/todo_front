"use client";

import { Task } from "@/app/types/task";
import apiClient from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import styles from "../styles/todoList.module.css";
import flashStyles from "../styles/messages.module.css";
import { useFlashMessage } from "../context/FlashMessageContext";
import { Header } from "../componetnts/header";
import { Table } from "../componetnts/table";
import { Calender } from "../componetnts/calender";
import { format, parse } from "date-fns";
import { useState } from "react";
import { Modal } from "../componetnts/modal";

export default function TaskList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await apiClient.get("/tasks", {
        params: {
          start_date: "",
          end_date: "",
        },
      });
      return response.data;
    },
    staleTime: 0,
  });

  const { setFlashMessage } = useFlashMessage();

  const [selectedStartDate, setSelectedStartDate] = useState<string | null>(
    null
  );
  const [selectedEndDate, setSelectedEndDate] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleStartDateChange = (date: Date) => {
    setSelectedStartDate(format(date, "yyyy-MM-dd"));
  };

  const handleEndDateChange = (date: Date) => {
    setSelectedEndDate(format(date, "yyyy-MM-dd"));
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleExport = async () => {
    try {
      const response = await apiClient.post("/tasks/export", {
        responseType: "blob",
      });
      const blob = new Blob([response.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "tasks.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setFlashMessage("csvの出力を開始しました", "success");
    } catch {
      setFlashMessage("csvの出力に失敗しました", "fail");
    }
  };

  const { message, type } = useFlashMessage();
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>データの取得に失敗しました</p>;

  return (
    <>
      <Header />

      {message && type && <div className={flashStyles[type]}>{message}</div>}

      <div className={styles.container}>
        <h1 className={styles.title}>Todoリスト</h1>
        <div className="flex m-5 space-x-4">
          <Link href={`/tasks/new`} className={styles.link}>
            <button className={styles.addButton}>作成</button>
          </Link>
          <button className={styles.addButton} onClick={() => handleExport()}>
            CSVエクスポート
          </button>
          <button onClick={() => setIsOpen(true)} className={styles.addButton}>
            設定
          </button>
        </div>

        <Table tasks={data as Task[]} />
        {isOpen && (
          <Modal handleCloseModal={handleCloseModal}>
            <div className="flex m-5">
              <Calender
                label="開始日時"
                id="start"
                handleDateChange={handleStartDateChange}
                selectedDate={
                  selectedStartDate
                    ? parse(selectedStartDate, "yyyy-MM-dd", new Date())
                    : null
                }
              />
              <Calender
                label="終了日時"
                id="end"
                handleDateChange={handleEndDateChange}
                selectedDate={
                  selectedEndDate
                    ? parse(selectedEndDate, "yyyy-MM-dd", new Date())
                    : null
                }
              />
            </div>
          </Modal>
        )}
      </div>
    </>
  );
}

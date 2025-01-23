import React, { useState } from "react";
import styles from "../styles/taskForm.module.css";
import { Calender } from "./calender";
import { format, parse } from "date-fns";
import apiClient from "@/lib/axios";
import { useParams, useRouter } from "next/navigation";
import { useFlashMessage } from "../context/FlashMessageContext";

type TaskFormProps = {
  titleData: string | null;
  contentData: string | null;
  startDateData: Date | null;
  endDateData: Date | null;
};

export const TaskForm: React.FC<TaskFormProps> = ({
  titleData,
  contentData,
  startDateData,
  endDateData,
}) => {
  const [selectedStartDate, setSelectedStartDate] = useState<string | null>(
    startDateData ? format(startDateData, "yyyy-MM-dd") : null
  );
  const [selectedEndDate, setSelectedEndDate] = useState<string | null>(
    endDateData ? format(endDateData, "yyyy-MM-dd") : null
  );

  const handleStartDateChange = (date: Date) => {
    setSelectedStartDate(format(date, "yyyy-MM-dd"));
  };

  const handleEndDateChange = (date: Date) => {
    setSelectedEndDate(format(date, "yyyy-MM-dd"));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // APIにPATCHリクエストを送信
      await apiClient.patch(`/tasks/${id}`, {
        title: title,
        content: content,
        start_date: selectedStartDate,
        end_date: selectedEndDate,
      });

      setFlashMessage("作成に成功しました！", "success");
      router.push("/tasks");
    } catch {
      setFlashMessage("作成に失敗しました！", "fail");
      router.push("/tasks");
    }
  };

  const [title, setTitle] = useState(titleData);
  const [content, setContent] = useState(contentData);
  const params = useParams();
  const { id } = params;
  const router = useRouter();
  const { setFlashMessage } = useFlashMessage();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {id ? "タスクの編集ページ" : "タスクの作成ページ"}
      </h1>
      <form onSubmit={handleSubmit}>
        <p className={styles.label}>タイトル</p>
        <input
          onChange={(e) => setTitle(e.target.value)}
          className={styles.inputField}
          value={title || ""}
        />
        <p className={styles.label}>内容</p>
        <textarea
          onChange={(e) => setContent(e.target.value)}
          className={styles.inputField}
          value={content || ""}
        />
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
        <div>
          <button type="submit" className={styles.buttonPrimary}>
            {id ? "更新" : "作成"}
          </button>
        </div>
      </form>
    </div>
  );
};

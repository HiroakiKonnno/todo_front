"use client";

import { Header } from "@/app/componetnts/header";
import { TaskForm } from "@/app/componetnts/taskForm";

export default function TaskDetailPage() {
  return (
    <>
      <Header />
      <TaskForm
        titleData={null}
        contentData={null}
        startDateData={null}
        endDateData={null}
      />
    </>
  );
}

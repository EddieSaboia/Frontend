import React, { useEffect, useState } from "react";

type Task = {
  id: number;
  title: string;
  description: string;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("tasks");
      if (stored) {
        setTasks(JSON.parse(stored));
      }
    } catch {
      setError("Não foi possível carregar as tasks do localStorage.");
    }
  }, []);

  return (
    <div className="flex flex-col items-center h-full w-full">
      <h1 className="text-5xl font-bold mt-16 mb-4">Hello World</h1>
      <h2 className="text-2xl font-normal mb-8">Frontend Zup test</h2>
    </div>
  );
}

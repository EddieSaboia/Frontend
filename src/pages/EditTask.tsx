import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

type Task = {
  id: number;
  title: string;
  description: string;
};

export default function EditTask() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    const stored = localStorage.getItem("tasks");
    if (stored) {
      try {
        const tasks: Task[] = JSON.parse(stored);
        const task = tasks.find(t => t.id === parseInt(id));
        if (task) {
          setTitle(task.title);
          setDescription(task.description);
        } else {
          setError("Task não encontrada");
        }
      } catch {
        setError("Erro ao carregar task");
      }
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    if (!title.trim() || !description.trim()) {
      setError("Preencha todos os campos.");
      return;
    }
    try {
      const stored = localStorage.getItem("tasks");
      if (stored) {
        const tasks: Task[] = JSON.parse(stored);
        const updatedTasks = tasks.map(task => 
          task.id === parseInt(id!) 
            ? { ...task, title, description }
            : task
        );
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        setSuccess("Task atualizada com sucesso!");
        setTimeout(() => navigate("/tasks"), 1500);
      }
    } catch {
      setError("Erro ao salvar task.");
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-5xl font-bold mt-16 mb-8">Edit Task</h1>
      <form className="w-2/3 flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="font-medium">Task
          <input
            className="block w-full border rounded p-1 mt-1"
            type="text"
            name="task"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </label>
        <label className="font-medium">Description
          <textarea
            className="block w-full border rounded p-2 mt-1 min-h-[200px]"
            name="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </label>
        <div className="flex gap-2 self-end">
          <button 
            type="button" 
            onClick={() => navigate("/tasks")}
            className="px-4 py-1 border rounded bg-gray-200 hover:bg-gray-300 shadow"
          >
            Cancelar
          </button>
          <button type="submit" className="px-4 py-1 border rounded bg-white hover:bg-gray-100 shadow">
            Salvar
          </button>
        </div>
        {success && <div className="text-green-600 mt-2">{success}</div>}
        {error && <div className="text-red-600 mt-2">{error}</div>}
      </form>
    </div>
  );
}
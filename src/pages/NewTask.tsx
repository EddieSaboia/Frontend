import React, { useState } from "react";

export default function NewTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    if (!title.trim() || !description.trim()) {
      setError("Preencha todos os campos.");
      return;
    }
    try {
      const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      const newTask = { id: Date.now(), title, description };
      tasks.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      setSuccess("Task adicionada com sucesso!");
      setTitle("");
      setDescription("");
    } catch {
      setError("Erro ao salvar task.");
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-5xl font-bold mt-16 mb-8">New Tasks</h1>
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
        <button type="submit" className="self-end px-4 py-1 border rounded bg-white hover:bg-gray-100 shadow">Submit</button>
        {success && <div className="text-green-600 mt-2">{success}</div>}
        {error && <div className="text-red-600 mt-2">{error}</div>}
      </form>
    </div>
  );
}

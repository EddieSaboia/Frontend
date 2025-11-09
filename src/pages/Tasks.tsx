import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../components/ConfirmationModal";

type Task = {
  id: number;
  title: string;
  description: string;
};

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) {
      try {
        setTasks(JSON.parse(stored));
      } catch {
        setTasks([]);
      }
    }
  }, []);

  const handleRemove = (id: number) => {
    const updated = tasks.filter((task) => task.id !== id);
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
    setTaskToDelete(null);
  };

  const handleDeleteClick = (task: Task) => {
    setTaskToDelete(task);
  };

  const handleCancelDelete = () => {
    setTaskToDelete(null);
  };

  const handleEdit = (id: number) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="flex flex-col items-center w-full px-4">
      <h1 className="text-5xl font-bold mt-16 mb-2">Tasks</h1>
      <h2 className="text-2xl font-normal mb-8">List of tasks</h2>
      <div className="w-full max-w-full overflow-x-auto">
        <table className="w-full border-collapse table-fixed max-w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-2 text-left w-1/5">Task</th>
              <th className="border px-2 py-2 text-left w-3/5">Description</th>
              <th className="border px-2 py-2 text-left w-1/5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="odd:bg-gray-100">
                <td className="border px-2 py-2 break-all w-1/5">{task.title}</td>
                <td className="border px-2 py-2 break-all w-3/5 max-w-0">{task.description}</td>
                <td className="border px-2 py-2 w-1/5">
                  <div className="flex gap-1 flex-wrap">
                    <button
                      className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
                      onClick={() => handleEdit(task.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                      onClick={() => handleDeleteClick(task)}
                    >
                      Remover
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <ConfirmationModal
        isOpen={!!taskToDelete}
        title="Excluir Task"
        message={`Tem certeza que deseja excluir a task "${taskToDelete?.title}"? Esta ação não pode ser desfeita.`}
        onConfirm={() => taskToDelete && handleRemove(taskToDelete.id)}
        onCancel={handleCancelDelete}
        confirmButtonText="Excluir"
        cancelButtonText="Cancelar"
      />
    </div>
  );
}

export default Tasks;
import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <nav className="fixed top-4 left-4 w-32 border rounded bg-white/80 shadow p-2 flex flex-col gap-2">
      <Link to="/" className="hover:underline">Home</Link>
      <Link to="/tasks" className="hover:underline">Tasks</Link>
      <Link to="/new" className="hover:underline">New Task</Link>
    </nav>
  );
}

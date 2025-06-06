import React, { useState, useEffect } from "react";
import axios from "axios";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

// Make sure your .env file has VITE_API_BASE_URL like:
// VITE_API_BASE_URL=http://localhost:5000/api
const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const { user } = useAuth();

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API}/api/tasks`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      console.log(`path: ${API}/api/tasks`);
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchTasks();
    }
  }, [user?.token]);

  const addTask = async (text) => {
    try {
      const res = await axios.post(
        `${API}/api/tasks`,
        { text },
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      );
      setTasks((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Add task error:", err);
    } finally {
        console.log(`path: ${API}/api/tasks`);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API}/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const toggleTask = async (id) => {
    const task = tasks.find((t) => t._id === id);
    if (!task) return;

    try {
      await axios.put(
        `${API}/api/tasks/${id}`,
        { completed: !task.completed },
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      );
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? { ...t, completed: !t.completed } : t))
      );
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Navbar />
      <h2>Welcome, {user?.email}</h2>
      <AddTodo onAdd={addTask} />
      <TodoList tasks={tasks} onDelete={deleteTask} onToggle={toggleTask} />
    </div>
  );
};

export default Dashboard;

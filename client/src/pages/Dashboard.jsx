import React, { useState, useEffect } from "react";
import axios from "axios";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import "./css/Dashboard.css"; // Import the CSS file

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/api/tasks`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setTasks(res.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Failed to load tasks. Please try again.");
    } finally {
      setLoading(false);
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
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Task Manager</h1>
          <p className="dashboard-subtitle">Welcome, {user?.email}</p>
        </div>
        
        <AddTodo onAdd={addTask} />
        
        {loading && <p className="loading-message">Loading your tasks...</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && tasks.length > 0 && (
          <TodoList tasks={tasks} onDelete={deleteTask} onToggle={toggleTask} />
        )}
        {!loading && !error && tasks.length === 0 && (
          <p className="loading-message">No tasks yet! Add one to get started.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
import React, { useState, useEffect } from "react";
import axios from "axios";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import "./css/Dashboard.css";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [togglingIds, setTogglingIds] = useState(new Set());
  const { user } = useAuth();

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/api/tasks?timestamp=${Date.now()}`, {
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
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );
      setTasks((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Add task error:", err);
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
    try {
      setTogglingIds(prev => new Set(prev).add(id));
      
      const task = tasks.find(t => t._id === id);
      const newCompletedStatus = !task.completed;
      
      // Optimistic update
      setTasks(prev => prev.map(t => 
        t._id === id ? { ...t, completed: newCompletedStatus } : t
      ));
      
      const response = await axios.put(
        `${API}/api/tasks/${id}`,
        { completed: newCompletedStatus },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );
      
      // Sync with server response
      setTasks(prev => prev.map(t => 
        t._id === id ? response.data : t
      ));
    } catch (err) {
      // Revert on error
      setTasks(prev => prev.map(t => 
        t._id === id ? { ...t, completed: !t.completed } : t
      ));
      console.error("Toggle error:", err);
    } finally {
      setTogglingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
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
        {!loading && !error && (
          <TodoList 
            tasks={tasks} 
            onDelete={deleteTask} 
            onToggle={toggleTask}
            togglingIds={togglingIds}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
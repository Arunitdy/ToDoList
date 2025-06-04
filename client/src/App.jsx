import React, { useState, useEffect } from "react";
import axios from "axios";


import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";


const App = () => {
  const [tasks, setTasks] = useState(null);

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get("/api/tasks");
      setTasks(res.data);
      console.log("Fetched tasks:", res.data);
    } catch (error) {
      alert("Failed to fetch tasks");
    } 
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add new task
  const addTask = async (text) => {
    try {
      const res = await axios.post("/api/tasks", { title: text });
      setTasks((prev) => [...prev, res.data]);
    } catch (error) {
          console.error("Add task error:", err.response?.data || err.message);
      alert("Failed to add task");
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      alert("Failed to delete task");
    }
  };

  // Toggle completed status
  const toggleTask = async (id) => {
    try {
      const task = tasks.find((t) => t._id === id);
      const updated = { ...task, completed: !task.completed };
      await axios.put(`/api/tasks/${id}`, updated);
      setTasks((prev) =>
        prev.map((task) =>
          task._id === id ? { ...task, completed: !task.completed } : task
        )
      );
    } catch (error) {
      alert("Failed to update task");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h1>To-Do List</h1>
      <AddTodo onAdd={addTask} />
      {tasks?<TodoList tasks={tasks} onDelete={deleteTask} onToggle={toggleTask} /> :<></>}
    </div>
  );
};

export default App;

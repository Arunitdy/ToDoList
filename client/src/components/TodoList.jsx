import React from "react";
import TodoItem from "./TodoItem";
import "./css/todoList.css";

const TodoList = ({ tasks = [], onDelete, onToggle, togglingIds = new Set() }) => {
  if (tasks.length === 0) {
    return <p className="empty-message">No tasks yet! Add one.</p>;
  }

  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <TodoItem
          key={task._id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
          isToggling={togglingIds.has(task._id)}
        />
      ))}
    </ul>
  );
};

export default TodoList;
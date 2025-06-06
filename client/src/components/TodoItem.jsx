import React from "react";
import "./css/TodoItem.css";

const TodoItem = ({ task, onDelete, onToggle, isToggling }) => {
  return (
    <li className="todo-item">
      <span 
        className={`todo-text ${task.completed ? 'completed' : ''} ${isToggling ? 'updating' : ''}`}
        onClick={() => onToggle(task._id)}
      >
        {task.text}
      </span>
      <button 
        className="delete-btn" 
        onClick={() => onDelete(task._id)}
        aria-label="Delete task"
      >
        ❌
      </button>
    </li>
  );
};

export default TodoItem;
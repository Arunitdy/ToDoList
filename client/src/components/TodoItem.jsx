import { useState } from "react";
import React  from "react";
import "./css/TodoItem.css"; 

const TodoItem = ({ task, onDelete, onToggle }) => {
  const [taskList, setTaskList] = useState(task || {});
  return (
    <li className="todo-item">
      <span 
        className={`todo-text ${taskList.completed ? 'completed' : ''}`}
        onClick={() => onToggle(taskList._id)}
      >
        {taskList.text}
      </span>
      <button className="delete-btn" onClick={() => onDelete(taskList._id)}>❌</button>
    </li>
  );
};
export default TodoItem;
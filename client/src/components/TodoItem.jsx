import { useState } from "react";
import React  from "react";

const TodoItem = ({ task, onDelete, onToggle }) => {
  const [taskList, setTaskList] = useState(task || {});
  return (
    <li
      style={{
        padding: "10px",
        marginBottom: "10px",
        border: "1px solid #ccc",
        width: "50%",
        margin: "auto",
        borderRadius: "5px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <span
        onClick={() => onToggle(taskList._id)}
        style={{
          textDecoration: taskList.completed ? "line-through" : "none",
          cursor: "pointer"
        }}
      >
        {taskList.title}
      </span>
      <button onClick={() => onDelete(taskList._id)}>❌</button>
    </li>
  );
};

export default TodoItem;

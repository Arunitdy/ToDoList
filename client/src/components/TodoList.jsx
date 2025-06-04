// TodoList.jsx
import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ tasks, onDelete, onToggle }) => {
  if (!tasks || tasks.length === 0) {
    return <p>No tasks yet! Add one.</p>;
  }

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {tasks.map((task) => (
        <TodoItem
          key={task._id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
};

export default TodoList;
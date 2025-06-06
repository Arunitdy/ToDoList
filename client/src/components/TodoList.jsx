import React from "react";
import TodoItem from "./TodoItem";
import "./css/todoList.css"; // Import the CSS file

const TodoList = ({ tasks, onDelete, onToggle }) => {
  const [taskList, setTaskList] = React.useState(tasks || []);
  
  if (taskList.length === 0) {
    return <p className="empty-message">No tasks yet! Add one.</p>;
  }

  return (
    <ul className="todo-list">
      {taskList.map((task) => (
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
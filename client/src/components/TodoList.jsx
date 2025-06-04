import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ tasks, onDelete, onToggle }) => {
  const [taskList, setTaskList] = React.useState(tasks || []);
  if (taskList.length === 0) {
    return <p>No tasks yet! Add one.</p>;
  }

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {taskList.map((task) => (
        console.log(task),
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

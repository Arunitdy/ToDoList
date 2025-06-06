import React, { useState } from "react";
import "./css/AddTodo.css";

const AddTodo = ({ onAdd }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  };

  return (
    <form className=" Addtodo" onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a task..."
        style={{ padding: "8px", width: "60%" }}
      />
      <button type="submit" style={{ padding: "8px", marginLeft: "8px" }}>
        Add
      </button>
    </form>
  );
};

export default AddTodo;

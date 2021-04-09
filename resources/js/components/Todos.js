import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Todo from "./Todo";
import Header from "./Header";

{
  /* This is the "main" component of the application that keeps track of all todos,
and makes calles to the database. One change that could be done is to just make an App component which is 
1 parent higher to better split up the project for better re-usability. */
}
function Todos() {
  const [todos, setTodos] = useState([]);

  // When the component is used, immediately get all todos.
  useEffect(() => {
    loadTodos();
  }, []);

  // Gets all todos from database
  const loadTodos = async () => {
    const response = await axios.get("http://localhost:8000/api/todos");
    setTodos(response.data);
  };

  // Delete Todo from database, and update state accordingly
  const deleteTodo = async (id) => {
    await axios.delete("http://localhost:8000/api/todos/" + id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Adds Todo to database, then add the Todo to the current state.
  const addTodo = async (title, desc, completed) => {
    const response = await axios.post("http://localhost:8000/api/todos", {
      title: title,
      description: desc,
      completed: completed,
    });
    setTodos([...todos, response.data]);
  };

  // Toggles the boolean 'completed' in the database.
  const toggleCompletedDB = async (id) => {
    await axios.put("http://localhost:8000/api/todos/" + id);
  };

  // Renders the header and every Todo in the current state/database, if there are no todos
  // we give a visual representation to the user that indicates that there are no todos.
  return (
    <div className="container">
      <Header addTodo={addTodo} />
      {todos.length > 0 ? (
        todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            toggleCompletedDB={toggleCompletedDB}
          />
        ))
      ) : (
        <p>No tasks to show</p>
      )}
    </div>
  );
}

export default Todos;

if (document.getElementById("todos")) {
  ReactDOM.render(<Todos />, document.getElementById("todos"));
}

import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import EditButton from "./EditButton";
{
  /*The Todo component keeps track if a todo is done or needs to deleted.
   We do this by keeping track of the todo.completed boolean field. If double clicked on the div
   then the task is marked done.*/
}

function Todo({ todo, deleteTodo, toggleCompletedDB, editTodo, uploadPhoto }) {
  const [completed, toggleCompleted] = useState(todo.completed);

  //TODO: This event is not called??? Fix form.
  const handleSubmit = (event) => {
    // event.preventDefault();
    console.log("Handling submit");
    const fileInput = document.querySelector("#fileupload");
    const formData = new FormData();
    formData.append("image", fileInput.files[0]);
    uploadPhoto(todo.id, formData);
  };

  return (
    <div
      className="todo"
      onDoubleClick={() => {
        toggleCompleted(!completed);
        toggleCompletedDB(todo.id);
      }}
    >
      <h3 className={completed ? "completed" : " "}>
        {todo.title} <EditButton todo={todo} editTodo={editTodo} />
        <form id="upload-image" onSubmit={() => handleSubmit}>
          <input id="fileupload" type="file" name="image" required />
          <button type="submit" id="btnUploadFile">
            Upload File
          </button>
        </form>
        <FaTimes className="deletebutton" onClick={() => deleteTodo(todo.id)} />
      </h3>
      <p className={completed ? "completed" : " "}>{todo.description}</p>
    </div>
  );
}

export default Todo;

import React, { useState } from "react";
import { FaTimes, FaPencilAlt } from "react-icons/fa";
import FormModal from "./FormModal";
{
  /*The Todo component keeps track if a todo is done or needs to deleted.
   We do this by keeping track of the todo.completed boolean field. If double clicked on the div
   then the task is marked done.*/
}

function Todo({ todo, deleteTodo, toggleCompletedDB }) {
  const [completed, toggleCompleted] = useState(todo.completed);
  // const [showModal, setShowModal] = useState(false);

  return (
    <div
      className="todo"
      onDoubleClick={() => {
        toggleCompleted(!completed);
        toggleCompletedDB(todo.id);
      }}
    >
      <h3 className={completed ? "completed" : " "}>
        {todo.title}{" "}
        {/*  TODO: Add way to change todos title/descrition <FaPencilAlt
          onClick={() => setShowModal(!showModal)}
          className="pencilbutton"
        /> */}
        <FaTimes className="deletebutton" onClick={() => deleteTodo(todo.id)} />
      </h3>
      <p className={completed ? "completed" : " "}>{todo.description}</p>

      {/* {showModal && <FormModal />} */}
    </div>
  );
}

export default Todo;

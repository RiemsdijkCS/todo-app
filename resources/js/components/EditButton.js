import React from "react";
import { FaPencilAlt } from "react-icons/fa";

function EditButton({ todo, editTodo }) {
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#editModal"
      >
        Edit <FaPencilAlt />
      </button>
      <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="editModalLable"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLable">
                Edit Todo
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="editTitle">Title</label>
                  <input
                    type="input"
                    className="form-control"
                    id="editTitle"
                    aria-describedby="emailHelp"
                    placeholder="e.g. do the laundry"
                  ></input>
                </div>
                <div className="form-group">
                  <label htmlFor="editDescription">Description</label>
                  <input
                    type="textarea"
                    className="form-control"
                    id="editDescription"
                    placeholder="e.g. this monday"
                  ></input>
                </div>
                {/* If the button is pressed we will get the values of the form fields and pass them 
                  to the function. The modal will be toggled as well to close it.*/}
                <button
                  type="button"
                  className="btn btn-primary mt-3"
                  data-toggle="modal"
                  data-target="#editModal"
                  onClick={() => {
                    const title = document.getElementById("editTitle").value;
                    const desc = document.getElementById("editDescription")
                      .value;

                    editTodo(todo.id, title, desc);
                  }}
                >
                  Edit Todo
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditButton;

import React, { useState, useEffect } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';

function EditButton({ todo, editTodo }) {
  // Hooks to set title and description for updated title
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [show, setShow] = useState(false);

  // Sets to show the modal whhen buttons are pressed
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Renders edit button
  return (
    <div>
      <button type='button' className='btn btn-primary' onClick={handleShow}>
        <FaPencilAlt />
      </button>

      {/* Renders modal if show is true */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
          <Modal.Body>
            <form>
              <div className='form-group'>
                <label htmlFor={todo.id + 'Title'}>Title</label>
                <input
                  type='input'
                  className='form-control'
                  id={todo.id + 'Title'}
                  aria-describedby='emailHelp'
                  placeholder={todo.title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                ></input>
              </div>
              <div className='form-group'>
                <label htmlFor={todo.id + 'Description'}>Description</label>
                <input
                  type='textarea'
                  className='form-control'
                  id={todo.id + 'Description'}
                  placeholder={todo.description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                ></input>
              </div>
              <button
                type='button'
                className='btn btn-primary mt-3'
                onClick={() => {
                  handleClose();
                  editTodo(todo.id, title, description);
                }}
              >
                Edit Todo
              </button>
            </form>
          </Modal.Body>
        </Modal.Header>
      </Modal>
    </div>
  );
}

export default EditButton;

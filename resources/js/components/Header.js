import React, { useState } from 'react';

{
  /* The Header component consists of a navbar and "Add Todo" button.  The "Add Todo" button will open a model which
keeps a form to add information of the Todo to be made.
The function addTodo is passed as prop, to call it and move upwards.
As state we keep the checked value, which keeps track if we want to already complete the
task if we create it. 
*/
}
function Header({ addTodo }) {
  const [checked, setChecked] = useState(false);

  // Renders the navbar and the button with modal/form included.
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light header'>
      <a className='navbar-brand' href='#'>
        Todo App
      </a>

      <div id='navbarSupportedContent '>
        <button
          type='button'
          className='btn btn-primary'
          data-toggle='modal'
          data-target='#addModal'
        >
          Add Todo
        </button>
        <div
          className='modal fade'
          id='addModal'
          tabIndex='-1'
          role='dialog'
          aria-labelledby='addModalLabel'
          aria-hidden='true'
        >
          <div className='modal-dialog' role='document'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title' id='addModalLabel'>
                  Add Todo
                </h5>
                <button
                  type='button'
                  className='close'
                  data-dismiss='modal'
                  aria-label='Close'
                >
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div className='modal-body'>
                <form>
                  <div className='form-group'>
                    <label htmlFor='inputTitle'>Title</label>
                    <input
                      type='input'
                      className='form-control'
                      id='inputTitle'
                      aria-describedby='emailHelp'
                      placeholder='e.g. do the laundry'
                    ></input>
                  </div>
                  <div className='form-group'>
                    <label htmlFor='inputDesciption'>Description</label>
                    <input
                      type='textarea'
                      className='form-control'
                      id='inputDescription'
                      placeholder='e.g. this monday'
                    ></input>
                  </div>
                  <div className='form-check'>
                    <input
                      type='checkbox'
                      className='form-check-input'
                      id='check'
                      onChange={() => {
                        setChecked(!checked);
                      }}
                    ></input>
                    <label className='form-check-label' htmlFor='checkboxLabel'>
                      Completed?
                    </label>
                  </div>
                  {/* If the button is pressed we will get the values of the form fields and pass them 
                  to the function. The modal will be toggled as well to close it.*/}
                  <button
                    type='button'
                    className='btn btn-primary mt-3'
                    data-toggle='modal'
                    data-target='#addModal'
                    onClick={() => {
                      const title = document.getElementById('inputTitle').value;
                      const desc = document.getElementById('inputDescription')
                        .value;

                      addTodo(title, desc, checked);
                    }}
                  >
                    Add Todo
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;

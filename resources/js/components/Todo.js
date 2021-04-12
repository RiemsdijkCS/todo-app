import React, { useState } from 'react';
import { FaTimes, FaUpload, FaSave } from 'react-icons/fa';
import EditButton from './EditButton';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
{
  /*
  The Todo component keeps track if a todo is done or needs to deleted.
  We do this by keeping track of the todo.completed boolean field. If double clicked on the div
  then the task is marked done.
   */
}

function Todo({ todo, deleteTodo, toggleCompletedDB, editTodo, uploadPhoto }) {
  const [completed, toggleCompleted] = useState(todo.completed);
  const [image, setImage] = useState('');

  const useStyles = makeStyles((theme) => ({
    accordion: {
      width: '75%',
    },
  }));

  const classes = useStyles();

  // Handles the upload button click
  const handleClick = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    uploadPhoto(todo.id, formData);
  };

  // Handles the change in input files and sets the image via the setImage hook
  const handleChange = (e) => {
    if (e.target.files.length) {
      setImage(e.target.files[0]);
    }
  };

  // Renders the accordion and all buttons for the Todo component.
  return (
    <div className='todo'>
      <h3 className={completed ? 'completed' : ' '}>
        {/* Renders accordion */}
        <Accordion className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-label='Expand'
            aria-controls='additional-actions1-content'
            id='additional-actions1-header'
          >
            <FormControlLabel
              aria-label='Acknowledge'
              onClick={(event) => event.stopPropagation()}
              onFocus={(event) => event.stopPropagation()}
              control={
                <Checkbox
                  checked={completed}
                  onClick={() => {
                    toggleCompleted(!completed);
                    toggleCompletedDB(todo.id);
                  }}
                />
              }
              label={todo.title}
            />
          </AccordionSummary>
          <div>
            <AccordionDetails>
              <div>
                <Typography color='textSecondary'>
                  {todo.description}
                </Typography>
              </div>

              <img
                className='image'
                src={'/storage/' + todo.id + '.jpg'}
                onError={(e) => (e.target.src = '')}
              ></img>
            </AccordionDetails>
          </div>
        </Accordion>

        {/* Renders all buttons */}
        <div className='d-flex justify-content-end'>
          <EditButton todo={todo} editTodo={editTodo} />
          <label htmlFor={String(todo.id)}>
            <FaUpload className='mr-3 ml-3 fileChoose'></FaUpload>
          </label>
          <input
            id={String(todo.id)}
            type='file'
            style={{ display: 'none' }}
            onChange={handleChange}
          />
          <button
            className='uploadButton ml-3 mr-3'
            onClick={(e) => {
              handleClick(e);
            }}
          >
            <FaSave></FaSave>
          </button>

          <FaTimes
            className='deletebutton'
            onClick={() => deleteTodo(todo.id)}
          />
        </div>
      </h3>
    </div>
  );
}

export default Todo;

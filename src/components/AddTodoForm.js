import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../store/TodoSlice';

const AddTodoForm = () => {
  const [todoText, setTodoText] = useState('');
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setTodoText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (todoText.trim() === '') return;
    dispatch(
      addTodo({
        id: Date.now(),
        text: todoText,
        completed: false,
      })
    );
    setTodoText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={todoText} onChange={handleInputChange} />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default AddTodoForm;

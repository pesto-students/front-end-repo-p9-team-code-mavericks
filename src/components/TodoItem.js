import { removeTodo, toggleTodo } from '../store/TodoSlice';
import { useDispatch } from 'react-redux';

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeTodo(todo.id));
  };

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id));
  };

  return (
    <div>
      <span
        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
        onClick={handleToggle}
      >
        {todo.text}
      </span>
      <button onClick={handleRemove}>Remove</button>
    </div>
  );
};

export default TodoItem;
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification, removeNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    dispatch(createAnecdote(content));
    dispatch(setNotification(`You created: ${content}`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>Create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;

import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification, removeNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.filter === '') {
      const sortedAnecdotes = [...state.anecdotes];
      sortedAnecdotes.sort((a, b) => b.votes - a.votes);
      return sortedAnecdotes;
    } else {
      return state.anecdotes
        .filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
        .sort((a, b) => b.votes - a.votes);
    }
  });

  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id));
    dispatch(setNotification(`You voted: ${anecdote.content}`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>Vote</button>
          </div>
        </div>  
      )}
    </div>
  );
};

export default AnecdoteList;

import { useSelector, useDispatch } from 'react-redux';
import { voteAction } from '../reducers/anecdoteReducer';
import { setNotification, removeNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(state =>
    state.anecdotes.sort((a, b) => b.votes - a.votes)
  );
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(voteAction(anecdote.id));
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

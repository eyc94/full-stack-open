import { createSlice } from '@reduxjs/toolkit';

const getId = () => (100000 * Math.random()).toFixed(0);

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push({
        content: action.payload,
        id: getId(),
        votes: 0,
      });
    },
    voteAnecdote(state, action) {
      const id = action.payload;
      const anecdoteToChange = state.find(a => a.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { createAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;

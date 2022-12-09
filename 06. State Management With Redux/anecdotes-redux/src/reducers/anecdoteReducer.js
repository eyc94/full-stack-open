import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    insertVotedAnecdote(state, action) {
      const votedAnecdote = action.payload;
      const id = action.payload.id;
      return state.map(anecdote => anecdote.id !== id ? anecdote : votedAnecdote);
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { insertVotedAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const voteAnecdote = id => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.vote(id);
    dispatch(insertVotedAnecdote(votedAnecdote));
  };
};

export default anecdoteSlice.reducer;

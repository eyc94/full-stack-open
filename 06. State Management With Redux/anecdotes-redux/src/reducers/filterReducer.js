import { createSlice } from '@reduxjs/toolkit';

const initialState = 'ALL';

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterAnecdotes(state, action) {
      const filterValue = action.payload;
      return state.map(anecdote => anecdote.content.toLowerCase().includes(filterValue.toLowerCase()));
    },
  },
});

export default filterSlice.reducer;

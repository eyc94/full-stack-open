import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      state = action.payload;
      return state;
    },
    removeNotification(state, action) {
      state = initialState;
      return state;
    }
  },
});

export const { setNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;

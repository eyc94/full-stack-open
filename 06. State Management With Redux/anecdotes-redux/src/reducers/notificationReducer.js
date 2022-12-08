import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      // state = action.payload;
      return action.payload;
    },
  },
});

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;

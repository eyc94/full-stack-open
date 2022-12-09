import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state, action) {
      return action.payload;
    },
    removeNotification(state, action) {
      return initialState;
    }
  },
});

export const { addNotification, removeNotification } = notificationSlice.actions;

export const setNotification = (message, seconds) => {
  return async dispatch => {
    dispatch(addNotification(message));
    setTimeout(() => dispatch(removeNotification()), seconds * 1000);
  };
};

export default notificationSlice.reducer;

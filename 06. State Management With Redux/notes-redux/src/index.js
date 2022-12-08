import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux'
import noteReducer, { createNote } from './reducers/noteReducer';
import filterReducer, { filterChange } from './reducers/filterReducer';

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer,
});

const store = createStore(reducer);

console.log(store.getState());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <Provider store={store}>
  //   <App />
  // </Provider>
  <div />
);

store.subscribe(() => console.log(store.getState()));
store.dispatch(filterChange('IMPORTANT'));
store.dispatch(createNote('combinedReducers forms one reducer from many simple reducers'));

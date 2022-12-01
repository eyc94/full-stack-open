import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';

import App from './App';

axios.get('http://localhost:3001/notes').then(response => {
  const notes = response.data;
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App notes={notes} />);
});

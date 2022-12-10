import React, { useState } from 'react';
import './index.css';

const App = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div className='container'>
      Hello webpack {counter} clicks
      <button onClick={() => setCounter(counter + 1)}>
        Press
      </button>
    </div>
  );
};

export default App;

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_BORN, ALL_AUTHORS} from '../queries';

const BornForm = ({ authorNames }) => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');

  const [changeBorn] = useMutation(EDIT_BORN, {
    refetchQueries: [
      { query: ALL_AUTHORS },
    ],
  });

  const submit = (event) => {
    event.preventDefault();
    changeBorn({
      variables: {
        name,
        setBornTo: parseInt(born),
      }
    });

    setName('');
    setBorn('');
  };

  return (
    <div>
      <h2>Set Birthyear</h2>
      <form onSubmit={submit}>
        <select value={name} onChange={({ target }) => setName(target.value)}>
          {authorNames &&
            authorNames.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))
          }
        </select>
        <div>
          Born: <input type='number' value={born} onChange={({ target }) => setBorn(target.value)} />
        </div>
        <button type='submit'>Update Author</button>
      </form>
    </div>
  );
};

export default BornForm;

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_BORN, ALL_AUTHORS} from '../queries';

const BornForm = () => {
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
        <div>
          Name: <input value={name} onChange={({ target }) => setName(target.value)} />
        </div>
        <div>
          Born: <input type='number' value={born} onChange={({ target }) => setBorn(target.value)} />
        </div>
        <button type='submit'>Update Author</button>
      </form>
    </div>
  );
};

export default BornForm;

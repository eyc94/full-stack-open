import { useQuery } from '@apollo/client';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import { ALL_PERSONS } from './queries';

const App = () => {
  // --- Fetch ALL_PERSONS every 2 seconds ---
  // const result = useQuery(ALL_PERSONS, {
  //   pollInterval: 2000,
  // });
  const result = useQuery(ALL_PERSONS);

  if (result.loading) {
    return <div>loading...</div> 
  }

  return (
    <div>
      <Persons persons={result.data.allPersons} />
      <PersonForm />
    </div>
  );
};

export default App;

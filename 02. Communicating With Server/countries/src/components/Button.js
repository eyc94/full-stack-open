import { useState } from 'react';

const Button = ({ country }) => {
  const [show, setShow] = useState(false);

  const handleShowInfo = () => {
    setShow(!show);
  };
  
  const languageKeys = Object.keys(country.languages);

  if (show) {
    return (
      <>
        <button onClick={handleShowInfo}>Hide</button>
        <h1>{country.name.common}</h1>
        <div>Capital: {country.capital}</div>
        <div>Area: {country.area}</div>
        <h3>Languages</h3>
        <ul>
          {languageKeys.map(key =>
            <li key={key}>{country.languages[key]}</li>
          )}
        </ul>
        <img src={country.flags.png} />
      </>
    );
  }

  return (
    <button onClick={handleShowInfo}>Show</button>
  );
};

export default Button;

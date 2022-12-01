import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from './components/Button';
import Weather from './components/Weather';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countryFilter, setCountryFilter] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
      });
  }, []);

  const handleCountryFilter = (event) => {
    setCountryFilter(event.target.value);
  };

  const countriesToShow = countries.filter(country =>
    country.name.common.toLowerCase().includes(countryFilter.toLowerCase())
  );

  if (countriesToShow.length > 10) {
    return (
      <>
        Find countries <input value={countryFilter} onChange={handleCountryFilter} />
        <div>Too many matches, specify another filter</div>
      </>
    );
  } else if (countriesToShow.length > 1 && countriesToShow.length < 10) {
    return (
      <>
        Find countries <input value={countryFilter} onChange={handleCountryFilter} />
        {countriesToShow.map(country =>
          <div key={country.name.common + country.capital}>
            {country.name.common} <Button country={country} />
          </div>
        )}
      </>
    );
  } else if (countriesToShow.length === 1) {
    return (
      <>
        Find countries <input value={countryFilter} onChange={handleCountryFilter} />
        <h1>{countriesToShow[0].name.common}</h1>
        <div>Capital: {countriesToShow[0].capital}</div>
        <div>Area: {countriesToShow[0].area}</div>
        <h3>Languages</h3>
        <ul>
          {Object.keys(countriesToShow[0].languages).map(key =>
            <li key={key}>{countriesToShow[0].languages[key]}</li>
          )}
        </ul>
        <img src={countriesToShow[0].flags.png} />
        <Weather country={countriesToShow[0]} />
      </>
    );
  } else {
    return (
      <>
        Find countries <input value={countryFilter} onChange={handleCountryFilter} />
        <div>No matches found</div>
      </>
    );
  }
};

export default App;

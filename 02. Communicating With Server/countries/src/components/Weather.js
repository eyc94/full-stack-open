import { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ country }) => {
  const [weather, setWeather] = useState(null);

  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${apiKey}`)
      .then(response => {
        setWeather(response.data);
      });
  }, []);

  if (weather) {
    return (
      <>
        <h3>Weather in {country.capital}</h3>
        <div>Temperature: {weather.main.temp} Celcius</div>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
        <div>Wind: {weather.wind.speed} m/s</div>
      </>
    );
  }

  return (
    <div>Loading weather info...</div>
  );
};

export default Weather;

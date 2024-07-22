import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.body.className = theme === 'dark' ? '' : 'light-mode';
  }, [theme]);

  const getWeather = async () => {
	try {
	  const response = await axios.get(`http://127.0.0.1:5000/weather?city=${encodeURIComponent(city)}`);
	  setWeather(response.data);
	  setError('');
	} catch (error) {
	  setError('City not found');
	  setWeather(null);
	}
  };  

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      getWeather();
    }
  };

  return (
    <div className="App">
      <nav className="navbar">
        <h1>Weather App</h1>
        <button onClick={toggleTheme}>
          Switch to {theme === 'dark' ? 'Light' : 'Dark'} Theme
        </button>
      </nav>
      <main className="App-content">
        <input 
          type="text" 
          value={city} 
          onChange={(e) => setCity(e.target.value)} 
          onKeyDown={handleKeyDown}
          placeholder="Enter city name" 
        />
        <button onClick={getWeather}>Get Weather</button>
        {weather && (
          <div>
            <h2>{weather.city}</h2>
            <p>{weather.temperature}°C</p>
            <p>{weather.description}</p>
          </div>
        )}
        {error && <p>{error}</p>}
      </main>
    </div>
  );
}

export default App;

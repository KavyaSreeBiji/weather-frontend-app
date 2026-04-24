import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import Insights from './components/Insights';
import MapDisplay from './components/MapDisplay';
import ExportData from './components/ExportData';
import { fetchWeather } from './utils/weatherApi';
import { getTheme } from './utils/theme';
import './App.css';

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [unit, setUnit] = useState('C');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [theme, setTheme] = useState('var(--sky-clear)');

  const handleLocationSelect = async (lat, lon, name) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const data = await fetchWeather(lat, lon);
      setWeatherData(data);
      setLocationName(name);

      const isDay = data.current.is_day;
      const code = data.current.weather_code;
      const newTheme = getTheme(code, isDay);
      setTheme(newTheme);
    } catch (e) {
      setErrorMsg('Could not fetch weather data. Please check your connection and try again.');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleUnitToggle = (newUnit) => {
    setUnit(newUnit);
  };

  // Sync background theme with the body directly like the vanilla app did
  useEffect(() => {
    document.body.style.background = theme;
  }, [theme]);

  return (
    <div className="app-container">
      <div className="header-top">
        <div className="app-logo">WeatherScope</div>
        <div className="unit-toggle">
          <button className={`unit-btn ${unit === 'C' ? 'active' : ''}`} onClick={() => handleUnitToggle('C')}>°C</button>
          <button className={`unit-btn ${unit === 'F' ? 'active' : ''}`} onClick={() => handleUnitToggle('F')}>°F</button>
        </div>
      </div>

      <SearchBar onLocationSelect={handleLocationSelect} onError={setErrorMsg} />

      {errorMsg && (
        <div className="error-box">
          <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
          <span>{errorMsg}</span>
        </div>
      )}

      <div id="content">
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>Fetching weather…</div>
          </div>
        ) : weatherData ? (
          <>
            <CurrentWeather data={weatherData} locationName={locationName} unit={unit} />
            <Forecast data={weatherData} unit={unit} />
            <Insights data={weatherData} />
            <MapDisplay latitude={weatherData.latitude} longitude={weatherData.longitude} locationName={locationName} />
            <ExportData data={weatherData} locationName={locationName} />
          </>
        ) : (
          <div className="welcome">
            <div className="welcome-icon">🌤️</div>
            <h2>What's the weather like?</h2>
            <p>Search for any city, landmark, or zip code — or use your current location.</p>
          </div>
        )}
      </div>

      <footer style={{ marginTop: '3rem', paddingTop: '1.5rem', textAlign: 'center', color: 'rgba(255,255,255,0.7)', fontSize: '13px', lineHeight: '1.6', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <p style={{ margin: '0 0 8px 0', fontWeight: '500', color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>Developed by Kavya Sree B</p>
        <p style={{ margin: 0, opacity: 0.85, maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
          <strong>Product Manager Accelerator:</strong> From entry-level to VP of Product, we support PM professionals through every stage of their careers.
        </p>
      </footer>
    </div>
  );
}

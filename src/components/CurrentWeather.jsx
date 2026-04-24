import React from 'react';
import { getWMO, toDisplay, unitLabel, windDisplay, dirToArrow } from '../utils/weatherApi';

export default function CurrentWeather({ data, locationName, unit }) {
  const c = data.current;
  const [icon, desc] = getWMO(c.weather_code);
  
  const nowStr = new Date(c.time).toLocaleString([], { weekday: 'long', hour: '2-digit', minute: '2-digit' });
  const pressure = Math.round(c.surface_pressure);
  const vis = c.visibility != null ? (unit === 'C' ? (c.visibility / 1000).toFixed(1) + ' km' : (c.visibility / 1609).toFixed(1) + ' mi') : '—';

  return (
    <div className="current-card">
      <div className="city-name">{locationName}</div>
      <div className="local-time">{nowStr}</div>
      <div className="weather-main">
        <div className="temp-display">
          <div className="temp-big">{toDisplay(c.temperature_2m, unit)}</div>
          <div className="temp-unit">{unitLabel(unit)}</div>
        </div>
        <div className="weather-icon-wrap">
          <span className="weather-icon">{icon}</span>
          <div className="weather-desc">{desc}</div>
        </div>
      </div>
      <div className="feels-like">Feels like {toDisplay(c.apparent_temperature, unit)}{unitLabel(unit)} &nbsp;·&nbsp; Humidity {c.relative_humidity_2m}%</div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Wind</div>
          <div className="stat-value">{windDisplay(c.wind_speed_10m, unit)}</div>
          <div className="stat-sub">{dirToArrow(c.wind_direction_10m)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Pressure</div>
          <div className="stat-value">{pressure}</div>
          <div className="stat-sub">hPa</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Visibility</div>
          <div className="stat-value" style={{ fontSize: '1.1rem', marginTop: '4px' }}>{vis}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Precip.</div>
          <div className="stat-value">{c.precipitation}</div>
          <div className="stat-sub">mm</div>
        </div>
      </div>
    </div>
  );
}

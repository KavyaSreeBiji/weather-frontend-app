import React from 'react';
import { getWMO, toDisplay, unitLabel, formatHour } from '../utils/weatherApi';

export default function Forecast({ data, unit }) {
  const daily = data.daily;
  const hourly = data.hourly;
  const current = data.current;

  // Process Hourly
  const nowIdx = hourly.time.findIndex(t => t >= current.time.substring(0, 13)) >= 0 
    ? hourly.time.findIndex(t => t >= current.time.substring(0, 13)) 
    : 0;
  
  const nextHours = hourly.time.slice(nowIdx, nowIdx + 8);
  const nextTemps = hourly.temperature_2m.slice(nowIdx, nowIdx + 8);
  const nextCodes = hourly.weather_code.slice(nowIdx, nowIdx + 8);

  // Process Daily
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dailySlice = daily.time.slice(1, 6);

  return (
    <>
      <div className="hourly-wrap">
        <div className="forecast-label">Next 8 hours</div>
        <div className="hourly-scroll">
          {nextHours.map((t, i) => {
            const [hi] = getWMO(nextCodes[i]);
            return (
              <div key={t} className="hour-card">
                <div className="hour-time">{formatHour(t)}</div>
                <div className="hour-icon">{hi}</div>
                <div className="hour-temp">{toDisplay(nextTemps[i], unit)}{unitLabel(unit)}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="hourly-wrap" style={{ marginTop: '1.5rem' }}>
        <div className="forecast-label">5-day forecast</div>
        <div className="forecast-scroll">
          {dailySlice.map((t, i) => {
            const idx = i + 1; // since we slice(1, 6)
            const dt = new Date(t);
            const [fi] = getWMO(daily.weather_code[idx]);
            const rain = daily.precipitation_probability_max[idx];
            return (
              <div key={t} className="day-card">
                <div className="day-name">{days[dt.getDay()]}</div>
                <div className="day-icon">{fi}</div>
                <div className="day-high">{toDisplay(daily.temperature_2m_max[idx], unit)}{unitLabel(unit)}</div>
                <div className="day-low">{toDisplay(daily.temperature_2m_min[idx], unit)}{unitLabel(unit)}</div>
                {rain > 10 && <div className="day-rain">💧 {rain}%</div>}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

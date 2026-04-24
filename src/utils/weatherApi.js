const WMO = {
  0: ['☀️', 'Clear sky'], 1: ['🌤️', 'Mainly clear'], 2: ['⛅', 'Partly cloudy'], 3: ['☁️', 'Overcast'],
  45: ['🌫️', 'Foggy'], 48: ['🌫️', 'Icy fog'], 51: ['🌦️', 'Light drizzle'], 53: ['🌦️', 'Drizzle'],
  55: ['🌧️', 'Heavy drizzle'], 61: ['🌧️', 'Slight rain'], 63: ['🌧️', 'Rain'], 65: ['🌧️', 'Heavy rain'],
  71: ['🌨️', 'Slight snow'], 73: ['🌨️', 'Snow'], 75: ['❄️', 'Heavy snow'], 77: ['🌨️', 'Snow grains'],
  80: ['🌦️', 'Rain showers'], 81: ['🌧️', 'Rain showers'], 82: ['⛈️', 'Violent showers'],
  85: ['🌨️', 'Snow showers'], 86: ['🌨️', 'Heavy snow showers'],
  95: ['⛈️', 'Thunderstorm'], 96: ['⛈️', 'Thunderstorm + hail'], 99: ['⛈️', 'Heavy thunderstorm']
};

export function getWMO(code) { return WMO[code] || ['🌡️', 'Unknown']; }

export function toDisplay(c, unit) { return unit === 'C' ? Math.round(c) : Math.round(c * 9/5 + 32); }
export function unitLabel(unit) { return '°' + unit; }
export function windDisplay(ms, unit) { return unit === 'C' ? Math.round(ms * 3.6) + ' km/h' : Math.round(ms * 2.237) + ' mph'; }

export function dirToArrow(deg) {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return dirs[Math.round(deg / 45) % 8];
}

export function formatTime(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function formatHour(iso) {
  const d = new Date(iso);
  const h = d.getHours();
  if (h === 0) return '12 AM';
  if (h < 12) return h + ' AM';
  if (h === 12) return '12 PM';
  return (h - 12) + ' PM';
}

export function uvLabel(uv) {
  if (uv <= 2) return { text: 'Low', color: '#4caf50' };
  if (uv <= 5) return { text: 'Moderate', color: '#ffc107' };
  if (uv <= 7) return { text: 'High', color: '#ff9800' };
  if (uv <= 10) return { text: 'Very High', color: '#f44336' };
  return { text: 'Extreme', color: '#9c27b0' };
}

export function getSmartNote(c, daily) {
  const tips = [];
  if (c.uv_index > 5) tips.push({ iconId: 'sun', text: 'High UV — apply sunscreen before going out.' });
  if (c.wind_speed_10m > 12) tips.push({ iconId: 'wind', text: 'Strong winds — secure loose items and plan accordingly.' });
  if (c.relative_humidity_2m > 80 && c.temperature_2m > 25) tips.push({ iconId: 'thermometer-sun', text: 'High heat + humidity — stay hydrated and limit outdoor exertion.' });
  if (c.precipitation > 1) tips.push({ iconId: 'umbrella', text: 'Precipitation detected — carry an umbrella.' });
  else if (daily.precipitation_probability_max?.[0] > 50) tips.push({ iconId: 'cloud-rain', text: 'High chance of rain today — bring a raincoat.' });
  if (c.temperature_2m < 0) tips.push({ iconId: 'snowflake', text: 'Below freezing — watch for icy surfaces.' });
  if (c.visibility != null && c.visibility < 1000) tips.push({ iconId: 'cloud-fog', text: 'Low visibility — drive carefully.' });
  if (!tips.length) {
    if (c.temperature_2m > 20 && c.weather_code <= 3) tips.push({ iconId: 'tree', text: 'Great day for outdoor activities — enjoy the nice weather!' });
    else tips.push({ iconId: 'info', text: 'Conditions look stable. Have a great day!' });
  }
  return tips;
}

const WEATHER_BASE_URL = import.meta.env.VITE_WEATHER_API_BASE_URL || 'https://api.open-meteo.com/v1';
const GEOCODE_BASE_URL = import.meta.env.VITE_GEOCODE_API_BASE_URL || 'https://geocoding-api.open-meteo.com/v1';
const NOMINATIM_BASE_URL = import.meta.env.VITE_NOMINATIM_API_BASE_URL || 'https://nominatim.openstreetmap.org';

export async function fetchWeather(lat, lon) {
  const url = `${WEATHER_BASE_URL}/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,relative_humidity_2m,is_day,uv_index,surface_pressure,visibility&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset,uv_index_max&timezone=auto&forecast_days=6&wind_speed_unit=ms`;
  const r = await fetch(url);
  if (!r.ok) throw new Error('API error');
  return r.json();
}

export async function fetchCitySuggestions(q) {
  const url = `${GEOCODE_BASE_URL}/search?name=${encodeURIComponent(q)}&count=5&language=en&format=json`;
  const r = await fetch(url);
  if (!r.ok) throw new Error('API error');
  return r.json();
}

export async function reverseGeocode(lat, lon) {
  const url = `${NOMINATIM_BASE_URL}/reverse?lat=${lat}&lon=${lon}&format=json`;
  const r = await fetch(url);
  if (!r.ok) throw new Error('API error');
  return r.json();
}

const SKY_THEMES = {
  clear_day: 'linear-gradient(160deg,#1565c0 0%,#1976d2 35%,#42a5f5 70%,#80cbc4 100%)',
  clear_night: 'linear-gradient(160deg,#0a0e2e 0%,#1a237e 40%,#283593 100%)',
  cloudy: 'linear-gradient(160deg,#455a64 0%,#607d8b 40%,#90a4ae 100%)',
  rain: 'linear-gradient(160deg,#263238 0%,#37474f 40%,#546e7a 100%)',
  storm: 'linear-gradient(160deg,#1a1a2e 0%,#16213e 40%,#0f3460 100%)',
  snow: 'linear-gradient(160deg,#78909c 0%,#90a4ae 40%,#b0bec5 100%)',
  fog: 'linear-gradient(160deg,#607d8b 0%,#90a4ae 50%,#cfd8dc 100%)',
  dawn: 'linear-gradient(160deg,#4a148c 0%,#e65100 40%,#f57c00 70%,#ffa726 100%)',
};

export function getTheme(code, isDay) {
  if (code === 0 || code === 1) return isDay ? SKY_THEMES.clear_day : SKY_THEMES.clear_night;
  if (code <= 3) return SKY_THEMES.cloudy;
  if (code <= 48) return SKY_THEMES.fog;
  if (code <= 65 || (code >= 80 && code <= 82)) return SKY_THEMES.rain;
  if (code >= 71 && code <= 86) return SKY_THEMES.snow;
  if (code >= 95) return SKY_THEMES.storm;
  return SKY_THEMES.cloudy;
}

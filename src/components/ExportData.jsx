import React from 'react';
import { Download } from 'lucide-react';

export default function ExportData({ data, locationName }) {
  if (!data) return null;

  const exportJSON = () => {
    const exportObj = {
      location: locationName,
      exportDate: new Date().toISOString(),
      weatherData: data
    };
    const blob = new Blob([JSON.stringify(exportObj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `weather_${locationName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportCSV = () => {
    const daily = data.daily;
    if (!daily || !daily.time) return;

    // Create CSV header
    let csvContent = "Date,Max Temp,Min Temp,Precipitation Prob (%),UV Index Max\n";
    
    // Add rows
    for (let i = 0; i < daily.time.length; i++) {
      const date = daily.time[i];
      const maxT = daily.temperature_2m_max[i];
      const minT = daily.temperature_2m_min[i];
      const precip = daily.precipitation_probability_max?.[i] ?? 0;
      const uv = daily.uv_index_max?.[i] ?? 0;
      
      csvContent += `${date},${maxT},${minT},${precip},${uv}\n`;
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `forecast_${locationName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ marginTop: '1.5rem', display: 'flex', gap: '12px', justifyContent: 'center', animation: 'fadeIn 0.8s ease-out' }}>
      <button onClick={exportJSON} className="btn" style={{ fontSize: '13px', padding: '10px 18px', background: 'rgba(255,255,255,0.15)' }}>
        <Download size={16} /> Export JSON
      </button>
      <button onClick={exportCSV} className="btn" style={{ fontSize: '13px', padding: '10px 18px', background: 'rgba(255,255,255,0.15)' }}>
        <Download size={16} /> Export CSV
      </button>
    </div>
  );
}

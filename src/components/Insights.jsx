import React from 'react';
import { uvLabel, formatTime, getSmartNote } from '../utils/weatherApi';
import { Sun, Wind, ThermometerSun, Umbrella, CloudRain, Snowflake, CloudFog, TreePine, Info } from 'lucide-react';

const IconMap = {
  'sun': Sun,
  'wind': Wind,
  'thermometer-sun': ThermometerSun,
  'umbrella': Umbrella,
  'cloud-rain': CloudRain,
  'snowflake': Snowflake,
  'cloud-fog': CloudFog,
  'tree': TreePine,
  'info': Info
};

export default function Insights({ data }) {
  const c = data.current;
  const daily = data.daily;

  const uv = c.uv_index ?? daily.uv_index_max?.[0] ?? 0;
  const uvInfo = uvLabel(uv);
  const uvPct = Math.min(100, Math.round((uv / 11) * 100));

  const sunrise = formatTime(daily.sunrise?.[0]);
  const sunset = formatTime(daily.sunset?.[0]);
  const smartNote = getSmartNote(c, daily);

  return (
    <div className="insights-grid">
      <div className="insight-card">
        <div className="insight-title">UV Index</div>
        <div className="insight-value">{Math.round(uv)}</div>
        <div className="uv-bar">
          <div className="uv-fill" style={{ width: `${uvPct}%`, background: uvInfo.color }}></div>
        </div>
        <div className="insight-sub">{uvInfo.text}</div>
      </div>
      <div className="insight-card">
        <div className="insight-title">Sun</div>
        <div className="insight-value" style={{ fontSize: '1.1rem' }}>↑ {sunrise}</div>
        <div className="insight-sub" style={{ marginTop: '6px' }}>↓ Sunset {sunset}</div>
      </div>
      <div className="insight-card" style={{ gridColumn: '1 / -1' }}>
        <div className="insight-title">Smart note</div>
        <div className="insight-sub" style={{ fontSize: '14px', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {smartNote.map((noteObj, i) => {
            const IconComp = IconMap[noteObj.iconId] || Info;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', background: 'rgba(255,255,255,0.08)', padding: '12px 14px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: '1.2rem', lineHeight: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}>
                  <IconComp size={16} color="rgba(255,255,255,0.95)" />
                </div>
                <div style={{ color: 'rgba(255,255,255,0.95)', paddingTop: '2px' }}>{noteObj.text}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

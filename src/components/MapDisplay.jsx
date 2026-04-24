import React from 'react';

export default function MapDisplay({ latitude, longitude, locationName }) {
  if (!latitude || !longitude) return null;

  return (
    <div className="map-card" style={{ marginTop: '1.5rem', animation: 'fadeIn 0.7s ease-out' }}>
      <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-dim)', marginBottom: '8px', paddingLeft: '4px' }}>
        Location Map
      </div>
      <div style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--card-border)', height: '250px', background: 'var(--card-bg)' }}>
        <iframe
          title={`Map of ${locationName}`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://maps.google.com/maps?q=${latitude},${longitude}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
        ></iframe>
      </div>
    </div>
  );
}

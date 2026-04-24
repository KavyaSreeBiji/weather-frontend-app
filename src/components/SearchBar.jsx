import React, { useState, useEffect, useRef } from 'react';
import { fetchCitySuggestions, reverseGeocode } from '../utils/weatherApi';

export default function SearchBar({ onLocationSelect, onError }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchTimeout = useRef(null);

  const handleInput = (e) => {
    const val = e.target.value;
    setQuery(val);
    clearTimeout(searchTimeout.current);
    if (val.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    searchTimeout.current = setTimeout(() => {
      fetchCitySuggestions(val)
        .then(data => {
          if (data.results) {
            setSuggestions(data.results);
            setShowSuggestions(true);
          } else {
            setSuggestions([]);
          }
        })
        .catch(() => setSuggestions([]));
    }, 350);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      setShowSuggestions(false);
      // fallback search with first suggestion or API search
      fetchCitySuggestions(query).then(data => {
        if (data.results && data.results.length > 0) {
          const loc = data.results[0];
          const label = [loc.name, loc.admin1, loc.country].filter(Boolean).join(', ');
          setQuery(label);
          onLocationSelect(loc.latitude, loc.longitude, label);
        } else {
          onError(`No location found for "${query}". Try a different search.`);
        }
      }).catch(() => onError('Network error — could not search location.'));
    }
  };

  const handleSelect = (lat, lon, name) => {
    setQuery(name);
    setShowSuggestions(false);
    onLocationSelect(lat, lon, name);
  };

  const handleGeolocate = () => {
    if (!navigator.geolocation) {
      onError('Geolocation is not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        reverseGeocode(latitude, longitude).then(data => {
          const city = data.address?.city || data.address?.town || data.address?.village || data.address?.county || 'Your Location';
          const country = data.address?.country || '';
          const label = country ? `${city}, ${country}` : city;
          setQuery(label);
          onLocationSelect(latitude, longitude, label);
        }).catch(() => {
          onLocationSelect(latitude, longitude, 'Your Location');
        });
      },
      (err) => {
        if (err.code === 1) onError('Location access denied. Please allow location permission or search manually.');
        else if (err.code === 2) onError('Location unavailable. Please search by city name.');
        else onError('Location request timed out. Please search by city name.');
      },
      { timeout: 8000 }
    );
  };

  // Close suggestions if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.search-wrap')) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="search-wrap">
      <input
        className="search-input"
        type="text"
        placeholder="Search city, landmark, ZIP code…"
        value={query}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        autoComplete="off"
      />
      <button className="btn" onClick={handleGeolocate} title="Use my location">
        <svg viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
        Locate
      </button>

      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions" style={{ display: 'block' }}>
          {suggestions.map((r, idx) => {
            const label = [r.name, r.admin1, r.country].filter(Boolean).join(', ');
            return (
              <div key={idx} className="suggestion-item" onClick={() => handleSelect(r.latitude, r.longitude, label)}>
                📍 {label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

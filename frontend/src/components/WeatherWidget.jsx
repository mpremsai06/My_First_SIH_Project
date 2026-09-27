import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Loader2 } from 'lucide-react';

export default function WeatherWidget({ lat, lon }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/weather?lat=${lat}&lon=${lon}`);
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        console.error("Failed to fetch weather", err);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [lat, lon]);

  if (loading) {
    return <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748b' }}><Loader2 size={14} className="spin" /> Loading weather...</div>;
  }

  if (!weather || weather.temperature === "N/A") {
    return null;
  }

  const getWeatherIcon = (code) => {
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return <CloudRain size={16} color="#0284c7" />;
    if ([1, 2, 3].includes(code)) return <Cloud size={16} color="#64748b" />;
    return <Sun size={16} color="#f59e0b" />;
  };

  return (
    <div style={{ background: '#FFFBEB', padding: '10px', borderRadius: '8px', marginTop: '12px', border: '1px solid #FEF3C7' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', color: '#92400E', marginBottom: '4px' }}>
        {getWeatherIcon(weather.weathercode)}
        <span>{weather.temperature}°C</span>
      </div>
      <div style={{ fontSize: '12px', color: '#B45309' }}>
        {weather.suggestion}
      </div>
    </div>
  );
}

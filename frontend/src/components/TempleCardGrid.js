import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Clock, Navigation, Ticket } from 'lucide-react';
import { useTranslation } from '../i18n/translations';
import WeatherWidget from './WeatherWidget';

export default function TempleCardGrid({ temples, searchTerm, onGetToken }) {
  const { t } = useTranslation();

  const filtered = temples.filter(temple => 
    (temple.name || "").toLowerCase().includes((searchTerm || "").toLowerCase()) ||
    (temple.state || "").toLowerCase().includes((searchTerm || "").toLowerCase())
  ).slice(0, 10);

  const getCrowdColor = (level) => {
    if (level === 'Critical') return '#ef4444';
    if (level === 'Moderate') return '#f59e0b';
    return '#10b981';
  };

  return (
    <div style={{ marginBottom: '40px' }}>
      <h2 style={{ color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px', marginBottom: '20px' }}>{t('templesTab')}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {filtered.map(temple => (
          <motion.div 
            key={temple.id}
            whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{ 
              background: 'white', borderRadius: '16px', overflow: 'hidden', 
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column'
            }}
          >
            <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
              <img src={temple.image_url} alt={temple.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.src = 'https://via.placeholder.com/600x400?text=Temple' }} />
              <div style={{ position: 'absolute', top: '12px', right: '12px', background: getCrowdColor(temple.crowd_level), color: 'white', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>
                {temple.crowd_level} Crowd
              </div>
            </div>
            <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ margin: '0 0 8px', fontSize: '20px', color: '#0f172a' }}>{temple.name}</h3>
              <p style={{ margin: '0 0 16px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px' }}>
                <MapPin size={16} /> {temple.state}
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '14px', color: '#334155', background: '#f8fafc', padding: '12px', borderRadius: '8px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ color: '#64748b', fontSize: '12px' }}><Clock size={14} style={{ verticalAlign: 'middle' }} /> {t('waitTime')}</span>
                  <strong style={{ fontSize: '16px' }}>{temple.wait_time_mins} mins</strong>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'right' }}>
                  <span style={{ color: '#64748b', fontSize: '12px' }}><Users size={14} style={{ verticalAlign: 'middle' }} /> {t('nextOpen')}</span>
                  <strong style={{ fontSize: '16px' }}>{temple.next_open_darshan}</strong>
                </div>
              </div>
              
              <WeatherWidget lat={temple.latitude} lon={temple.longitude} />

              <div style={{ marginTop: 'auto', display: 'flex', gap: '12px', paddingTop: '16px' }}>
                <a 
                  href={`https://www.google.com/maps/dir/?api=1&destination=${temple.latitude},${temple.longitude}`}
                  target="_blank" rel="noreferrer"
                  style={{ flex: 1, textDecoration: 'none', background: '#e0f2fe', color: '#0284c7', padding: '10px', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  <Navigation size={18} /> Maps
                </a>
                <button 
                  onClick={() => onGetToken(temple)}
                  style={{ flex: 1, background: '#D91B22', color: 'white', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  <Ticket size={16} /> Book Darshan
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

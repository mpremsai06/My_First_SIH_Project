import React from 'react';
import { motion } from 'framer-motion';
import { Star, Navigation } from 'lucide-react';
import { useTranslation } from '../i18n/translations';

export default function NearbyStaysGrid({ stays, searchTerm, onBookStay }) {
  const { t } = useTranslation();

  const filtered = stays.filter(stay => 
    (stay.name || "").toLowerCase().includes((searchTerm || "").toLowerCase()) ||
    (stay.type || "").toLowerCase().includes((searchTerm || "").toLowerCase())
  ).slice(0, 10);

  return (
    <div style={{ marginBottom: '40px' }}>
      <h2 style={{ color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '8px', marginBottom: '20px' }}>{t('staysTab')}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {filtered.map(stay => (
          <motion.div 
            key={stay.id}
            whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{ 
              background: 'white', borderRadius: '16px', overflow: 'hidden', 
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column'
            }}
          >
            <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
              <img src={stay.image_url} alt={stay.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.src = 'https://via.placeholder.com/600x400?text=Stay' }} />
              <div style={{ position: 'absolute', top: '12px', left: '12px', background: '#f59e0b', color: 'white', padding: '4px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Star size={14} fill="currentColor" /> {stay.rating}
              </div>
              <div style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(0,0,0,0.7)', color: 'white', padding: '4px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold' }}>
                {stay.rooms_left} {t('roomsLeft')}
              </div>
            </div>
            <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <h3 style={{ margin: '0', fontSize: '18px', color: '#0f172a', flex: 1 }}>{stay.name}</h3>
                <div style={{ textAlign: 'right', marginLeft: '12px' }}>
                  <div style={{ color: '#0284c7', fontWeight: 'bold', fontSize: '20px' }}>₹{stay.price_per_night}</div>
                  <div style={{ color: '#64748b', fontSize: '12px' }}>{t('pricePerNight')}</div>
                </div>
              </div>
              <p style={{ margin: '0 0 16px', color: '#64748b', fontSize: '14px' }}>{stay.type}</p>

              <div style={{ marginTop: 'auto', display: 'flex', gap: '12px' }}>
                <a 
                  href={`https://www.google.com/maps/dir/?api=1&destination=${stay.latitude},${stay.longitude}`}
                  target="_blank" rel="noreferrer"
                  style={{ flex: 1, textDecoration: 'none', background: '#f1f5f9', color: '#334155', padding: '10px', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  <Navigation size={18} /> Maps
                </a>
                <button 
                  onClick={() => onBookStay(stay)}
                  style={{ flex: 1, background: '#D91B22', color: 'white', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  {t('bookStay')}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

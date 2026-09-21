import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, HeartPulse } from 'lucide-react';
import { useTranslation } from '../i18n/translations';

export default function AmenitiesGrid({ amenities, searchTerm }) {
  const [filter, setFilter] = useState('All');
  const { t } = useTranslation();
  const categories = ['All', ...new Set(amenities.map(a => a.category))];

  const filteredAmenities = amenities.filter(a => {
    const matchesFilter = filter === 'All' || a.category === filter;
    const matchesSearch = (a.name || "").toLowerCase().includes((searchTerm || "").toLowerCase()) ||
                          (a.category || "").toLowerCase().includes((searchTerm || "").toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div style={{ background: '#ffffff', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.04)', height: '100%' }}>
      <h3 style={{ margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#1e293b' }}>
        <MapPin size={18} color="#16a34a" />
        {t('amenitiesTitle')}
      </h3>
      
      {/* Pills */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '12px' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              padding: '6px 12px',
              borderRadius: '20px',
              border: 'none',
              background: filter === cat ? '#16a34a' : '#f1f5f9',
              color: filter === cat ? 'white' : '#475569',
              cursor: 'pointer',
              fontSize: '12px',
              whiteSpace: 'nowrap'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredAmenities.map((a, i) => (
          <motion.div
            key={i}
            layout
            style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <div>
              <strong style={{ color: '#334155', fontSize: '14px' }}>{a.name}</strong>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
                {a.status} • {a.distance}
              </div>
            </div>
            {a.has_oxygen && (
              <div style={{ color: '#dc2626', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', background: '#fee2e2', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>
                <HeartPulse size={12} /> O2 Available
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

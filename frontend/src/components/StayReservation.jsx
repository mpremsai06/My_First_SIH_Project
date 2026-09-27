import React from 'react';
import { motion } from 'framer-motion';
import { Building2, ShieldCheck } from 'lucide-react';

export default function StayReservation({ hotels }) {
  return (
    <div style={{ background: '#ffffff', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.04)', height: '100%' }}>
      <h3 style={{ margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#1e293b' }}>
        <Building2 size={18} color="#0284c7" />
        Stay & Price-Gouging Radar
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {hotels.map((h, i) => (
          <motion.div
            key={i}
            layout
            whileHover={{ scale: 1.02 }}
            style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <strong style={{ color: '#334155' }}>{h.name}</strong>
                <div style={{ fontSize: '12px', color: '#64748b' }}>{h.category}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 'bold', fontSize: '16px', color: h.surge ? '#dc2626' : '#16a34a' }}>
                  ₹{h.price}
                </div>
                {h.surge && (
                  <span style={{ fontSize: '10px', background: '#fee2e2', color: '#dc2626', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>
                    Surge Alert
                  </span>
                )}
              </div>
            </div>
            <div style={{ marginTop: '8px', fontSize: '12px', display: 'flex', justifyContent: 'space-between', color: '#475569', alignItems: 'center' }}>
              <span>Rooms Left: <strong>{h.rooms}</strong></span>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ color: h.category.includes('Dharamshala') ? '#16a34a' : '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={14} /> Fair Price Verified
                </span>
                <button style={{ background: '#0284c7', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '10px' }}>
                  Book
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

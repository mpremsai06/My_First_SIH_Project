import React from 'react';
import { motion } from 'framer-motion';
import { Users, AlertTriangle } from 'lucide-react';

export default function CrowdMonitor({ crowd }) {
  if (!crowd) return null;

  const getBadgeColor = (status) => {
    if (status === 'CRITICAL' || status === 'HEAVY CROWD') return '#dc2626';
    if (status === 'HIGH') return '#ea580c';
    if (status === 'MODERATE') return '#ca8a04';
    return '#16a34a';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      layout
      style={{
        background: '#ffffff',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 4px 20px -2px rgba(0,0,0,0.06)',
        borderLeft: `8px solid ${getBadgeColor(crowd.status)}`,
        marginBottom: '28px'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={20} color={getBadgeColor(crowd.status)} />
            <span style={{ fontWeight: 'bold', color: '#334155' }}>CCTV Headcount Telemetry: {crowd.zone}</span>
          </div>
          <h2 style={{ fontSize: '32px', margin: '12px 0 6px', color: '#0f172a' }}>
            {crowd.live_count} Pilgrims Detected
          </h2>
          <div style={{ color: '#64748b', fontSize: '14px' }}>
            Density: <strong>{crowd.capacity_percentage}%</strong> of safe corridor capacity
          </div>
        </div>

        <motion.div
          key={crowd.status}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          style={{
            background: getBadgeColor(crowd.status),
            color: 'white',
            padding: '8px 16px',
            borderRadius: '30px',
            fontWeight: 'bold',
            fontSize: '14px'
          }}
        >
          STATUS: {crowd.status}
        </motion.div>
      </div>

      {crowd.redirection?.recommended && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          style={{ marginTop: '20px', background: '#fffbeb', border: '1px solid #fde68a', padding: '16px', borderRadius: '12px', display: 'flex', gap: '12px', alignItems: 'center', overflow: 'hidden' }}
        >
          <AlertTriangle color="#d97706" size={24} style={{ flexShrink: 0 }} />
          <div>
            <strong style={{ color: '#92400e' }}>Smart Crowd Redistribution:</strong>
            <div style={{ color: '#b45309', fontSize: '14px' }}>
              Main route is currently bottlenecked. Redirect to <strong>{crowd.redirection.target}</strong>. Estimated time saved: <strong>{crowd.redirection.time_saved}</strong>.
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

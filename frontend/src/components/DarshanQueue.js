import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock } from 'lucide-react';

export default function DarshanQueue({ darshan }) {
  const getBadgeColor = (status) => {
    if (status === 'HEAVY CROWD') return '#dc2626';
    if (status === 'MODERATE') return '#ca8a04';
    return '#16a34a';
  };

  return (
    <div style={{ background: '#ffffff', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.04)', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px', color: '#1e293b' }}>
          <Clock size={18} color="#ea580c" />
          Live Darshan Queues
        </h3>
        <button style={{ background: '#ea580c', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>
          Book Virtual Slot
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <AnimatePresence>
          {darshan.map((slot, index) => (
            <motion.div
              key={index}
              layout
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ color: '#334155' }}>{slot.temple}</strong>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: getBadgeColor(slot.status) }}>
                  {slot.wait_mins}m wait
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748b', marginTop: '6px' }}>
                <span>Slot: {slot.slot}</span>
                <span>Flow: {slot.status}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

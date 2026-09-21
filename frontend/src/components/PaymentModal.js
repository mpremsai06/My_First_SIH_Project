import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, CreditCard } from 'lucide-react';
import { useTranslation } from '../i18n/translations';

export default function PaymentModal({ isOpen, onClose, item, type }) {
  const { t } = useTranslation();
  const [success, setSuccess] = useState(false);
  const [ticketType, setTicketType] = useState('general');
  const [showBhimInput, setShowBhimInput] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [upiId, setUpiId] = useState('');

  if (!isOpen || !item) return null;

  const getBasePrice = () => {
    if (type === 'stay') return item.price_per_night;
    if (ticketType === 'vip') return 1000;
    if (ticketType === 'special') return 500;
    return 300; // general
  };

  const basePrice = getBasePrice();
  const commission = type === 'stay' ? Math.floor(basePrice * 0.05) : 50;
  const total = basePrice + commission;

  const handlePay = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
        background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
        display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
      }}>
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          style={{
            background: 'white', borderRadius: '24px', width: '90%', maxWidth: '400px',
            padding: '24px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
            position: 'relative'
          }}
        >
          <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
            <X size={24} />
          </button>

          {!success ? (
            <>
              <h2 style={{ margin: '0 0 16px', color: '#800000', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Cinzel, serif' }}>
                <CreditCard /> {type === 'token' ? 'Darshan Ticket Booking' : 'Hotel Booking'}
              </h2>
              
              {type === 'token' && (
                <div style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}>
                  <button onClick={() => setTicketType('general')} style={{ flex: 1, padding: '8px', borderRadius: '8px', border: ticketType === 'general' ? '2px solid #D97706' : '1px solid #cbd5e1', background: ticketType === 'general' ? '#FEF3C7' : 'white', cursor: 'pointer', fontWeight: 'bold', color: '#92400E' }}>General</button>
                  <button onClick={() => setTicketType('special')} style={{ flex: 1, padding: '8px', borderRadius: '8px', border: ticketType === 'special' ? '2px solid #D97706' : '1px solid #cbd5e1', background: ticketType === 'special' ? '#FEF3C7' : 'white', cursor: 'pointer', fontWeight: 'bold', color: '#92400E' }}>Special</button>
                  <button onClick={() => setTicketType('vip')} style={{ flex: 1, padding: '8px', borderRadius: '8px', border: ticketType === 'vip' ? '2px solid #D97706' : '1px solid #cbd5e1', background: ticketType === 'vip' ? '#FEF3C7' : 'white', cursor: 'pointer', fontWeight: 'bold', color: '#92400E' }}>VIP</button>
                </div>
              )}

              <div style={{ background: '#FFFBEB', padding: '16px', borderRadius: '12px', marginBottom: '20px', border: '1px solid #FDE68A' }}>
                <h3 style={{ margin: '0 0 8px', color: '#92400E' }}>{item.name}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#B45309' }}>
                  <span>{type === 'token' ? `${ticketType.toUpperCase()} Darshan Ticket` : t('baseFee')}</span>
                  <span>₹{basePrice}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: '#B45309', borderBottom: '1px solid #FDE68A', paddingBottom: '12px' }}>
                  <span>{t('commission')} (Seva Nidhi)</span>
                  <span>₹{commission}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', color: '#800000', fontSize: '18px' }}>
                  <span>{t('total')}</span>
                  <span>₹{total}</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button onClick={handlePay} style={{ background: '#0284c7', color: 'white', border: 'none', padding: '12px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                  {t('payWith')} UPI (GPay/PhonePe)
                </button>
                <button onClick={handlePay} style={{ background: '#cbd5e1', color: '#334155', border: 'none', padding: '12px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}>
                  {t('payWith')} Card
                </button>
                
                {/* BHIM UPI Mode */}
                {!showBhimInput ? (
                  <button onClick={() => { setShowBhimInput(true); setShowQr(false); }} style={{ background: '#f8fafc', color: '#0f172a', border: '1px solid #cbd5e1', padding: '12px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}>
                    {t('payWithBhim')}
                  </button>
                ) : (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input type="text" placeholder="example@upi" value={upiId} onChange={(e) => setUpiId(e.target.value)} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #cbd5e1', outline: 'none' }} />
                    <button onClick={handlePay} style={{ background: '#10b981', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>Pay</button>
                  </div>
                )}

                {/* QR Code Mode */}
                {!showQr ? (
                  <button onClick={() => { setShowQr(true); setShowBhimInput(false); }} style={{ background: '#f8fafc', color: '#0f172a', border: '1px solid #cbd5e1', padding: '12px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}>
                    {t('qrCodeSim')}
                  </button>
                ) : (
                  <div style={{ textAlign: 'center', background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>
                    <img src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=UPI_PAYMENT_${total}`} alt="Scan to pay" style={{ borderRadius: '8px', marginBottom: '12px' }} />
                    <div style={{ fontSize: '14px', color: '#64748b' }}>Scan this code with any UPI app</div>
                    <button onClick={handlePay} style={{ marginTop: '12px', background: '#10b981', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Simulate Scan Success</button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              style={{ textAlign: 'center', padding: '24px 0' }}
            >
              <CheckCircle size={64} color="#10b981" style={{ margin: '0 auto 16px' }} />
              <h3 style={{ color: '#10b981', margin: 0, fontFamily: 'Cinzel, serif' }}>Booking Confirmed!</h3>
              <div style={{ marginTop: '20px', background: '#FFFBEB', padding: '16px', borderRadius: '12px', border: '1px solid #FDE68A' }}>
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=DARSHAN_${item.id}_${Date.now()}`} alt="QR Code" style={{ borderRadius: '8px' }} />
                <p style={{ margin: '12px 0 0', fontWeight: 'bold', color: '#92400E' }}>Ticket ID: DARSHAN_{item.id}_{Date.now().toString().slice(-4)}</p>
                <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#B45309' }}>Please present this QR code at the entry gate.</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

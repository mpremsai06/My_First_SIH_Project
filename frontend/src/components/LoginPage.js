import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage({ setLoggedIn }) {
  const [method, setMethod] = useState('otp'); // 'otp' or 'password'
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoggedIn(true);
    // Go back to the previous page
    navigate(-1);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          padding: '40px',
          borderRadius: '24px',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
          width: '100%',
          maxWidth: '400px',
          border: '1px solid rgba(255,255,255,0.4)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ background: '#e0f2fe', width: '64px', height: '64px', borderRadius: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 16px', color: '#0284c7' }}>
            <User size={32} />
          </div>
          <h2 style={{ margin: '0 0 8px', color: '#0f172a' }}>Welcome Back</h2>
          <p style={{ margin: 0, color: '#64748b' }}>Please login to continue booking</p>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', background: '#f1f5f9', padding: '4px', borderRadius: '12px' }}>
          <button 
            onClick={() => setMethod('otp')}
            style={{ flex: 1, padding: '8px', border: 'none', borderRadius: '8px', background: method === 'otp' ? 'white' : 'transparent', boxShadow: method === 'otp' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', cursor: 'pointer', fontWeight: 'bold', color: method === 'otp' ? '#0f172a' : '#64748b' }}
          >
            OTP
          </button>
          <button 
            onClick={() => setMethod('password')}
            style={{ flex: 1, padding: '8px', border: 'none', borderRadius: '8px', background: method === 'password' ? 'white' : 'transparent', boxShadow: method === 'password' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', cursor: 'pointer', fontWeight: 'bold', color: method === 'password' ? '#0f172a' : '#64748b' }}
          >
            Password
          </button>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ position: 'relative' }}>
            <Phone size={20} style={{ position: 'absolute', top: '14px', left: '16px', color: '#94a3b8' }} />
            <input 
              type="text" 
              placeholder="Mobile Number" 
              required
              style={{ width: '100%', padding: '12px 16px 12px 48px', border: '1px solid #cbd5e1', borderRadius: '12px', outline: 'none', fontSize: '16px', boxSizing: 'border-box' }}
            />
          </div>

          {method === 'password' ? (
            <div style={{ position: 'relative' }}>
              <Lock size={20} style={{ position: 'absolute', top: '14px', left: '16px', color: '#94a3b8' }} />
              <input 
                type="password" 
                placeholder="Password" 
                required
                style={{ width: '100%', padding: '12px 16px 12px 48px', border: '1px solid #cbd5e1', borderRadius: '12px', outline: 'none', fontSize: '16px', boxSizing: 'border-box' }}
              />
            </div>
          ) : (
            <div style={{ position: 'relative' }}>
              <Lock size={20} style={{ position: 'absolute', top: '14px', left: '16px', color: '#94a3b8' }} />
              <input 
                type="text" 
                placeholder="6-digit OTP" 
                required
                style={{ width: '100%', padding: '12px 16px 12px 48px', border: '1px solid #cbd5e1', borderRadius: '12px', outline: 'none', fontSize: '16px', boxSizing: 'border-box' }}
              />
            </div>
          )}

          <button 
            type="submit"
            style={{ background: '#0284c7', color: 'white', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', marginTop: '8px' }}
          >
            Login & Continue
          </button>
        </form>
      </motion.div>
    </div>
  );
}

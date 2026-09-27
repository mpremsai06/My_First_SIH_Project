import React from 'react';
import { RefreshCw, PhoneCall, Globe, UserCheck, User } from 'lucide-react';
import { useTranslation } from '../i18n/translations';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ lastPing, loggedIn }) {
  const { lang, setLang, t } = useTranslation();
  const location = useLocation();

  const navLinkStyle = (path) => ({
    textDecoration: 'none',
    color: location.pathname === path ? '#800000' : '#64748b',
    fontWeight: location.pathname === path ? 'bold' : 'normal',
    padding: '8px 12px',
    borderRadius: '12px',
    background: location.pathname === path ? '#FFE0B2' : 'transparent',
    transition: 'all 0.2s'
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ margin: 0, fontSize: '32px', color: '#800000', fontWeight: '800', fontFamily: 'Cinzel, serif' }}>{t('appTitle')}</h1>
          <p style={{ margin: '4px 0 0', color: '#D97706', fontSize: '15px', fontWeight: '600' }}>{t('appSubtitle')}</p>
        </Link>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', background: '#f1f5f9', borderRadius: '20px', padding: '4px' }}>
            <button onClick={() => setLang('en')} style={{ border: 'none', padding: '4px 12px', borderRadius: '16px', background: lang === 'en' ? 'white' : 'transparent', boxShadow: lang === 'en' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', cursor: 'pointer', fontWeight: 'bold' }}>EN</button>
            <button onClick={() => setLang('hi')} style={{ border: 'none', padding: '4px 12px', borderRadius: '16px', background: lang === 'hi' ? 'white' : 'transparent', boxShadow: lang === 'hi' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', cursor: 'pointer', fontWeight: 'bold' }}>हिंदी</button>
            <button onClick={() => setLang('te')} style={{ border: 'none', padding: '4px 12px', borderRadius: '16px', background: lang === 'te' ? 'white' : 'transparent', boxShadow: lang === 'te' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', cursor: 'pointer', fontWeight: 'bold' }}>తెలుగు</button>
          </div>
          
          {loggedIn ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#10b981', color: 'white', padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold' }}>
              <UserCheck size={16} /> Yatri
            </div>
          ) : (
            <Link to="/login" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', background: '#e2e8f0', color: '#334155', padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold' }}>
              <User size={16} /> Login
            </Link>
          )}

          <button style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#dc2626', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 6px -1px rgba(220, 38, 38, 0.4)' }}>
            <PhoneCall size={16} /> {t('sosButton')}
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', background: '#FFEDD5', padding: '6px 12px', borderRadius: '20px', fontWeight: '500', color: '#9A3412' }}>
            <RefreshCw size={14} className="spin" style={{ color: '#D97706' }} />
            <span>{t('telemetryLive')} {lastPing || t('syncing')}</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
        <Link to="/" style={navLinkStyle('/')}>Home</Link>
        <Link to="/temples" style={navLinkStyle('/temples')}>Temples</Link>
        <Link to="/stays" style={navLinkStyle('/stays')}>Stays</Link>
        <Link to="/amenities" style={navLinkStyle('/amenities')}>Amenities</Link>
      </div>
    </div>
  );
}

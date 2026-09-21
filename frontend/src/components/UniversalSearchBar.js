import React from 'react';
import { Search } from 'lucide-react';
import { useTranslation } from '../i18n/translations';

export default function UniversalSearchBar({ searchTerm, setSearchTerm }) {
  const { t } = useTranslation();

  return (
    <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        maxWidth: '600px',
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        borderRadius: '30px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        border: '1px solid rgba(255,255,255,0.3)'
      }}>
        <div style={{ position: 'absolute', top: '12px', left: '16px', color: '#64748b' }}>
          <Search size={20} />
        </div>
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={t('searchPlaceholder')}
          style={{
            width: '100%',
            padding: '12px 16px 12px 48px',
            border: 'none',
            borderRadius: '30px',
            fontSize: '16px',
            outline: 'none',
            background: 'transparent',
            boxSizing: 'border-box'
          }}
        />
      </div>
    </div>
  );
}

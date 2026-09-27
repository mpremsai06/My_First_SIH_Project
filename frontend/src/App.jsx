import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import UniversalSearchBar from './components/UniversalSearchBar';
import TempleCardGrid from './components/TempleCardGrid';
import NearbyStaysGrid from './components/NearbyStaysGrid';
import ChatbotWidget from './components/ChatbotWidget';
import PaymentModal from './components/PaymentModal';
import AmenitiesGrid from './components/AmenitiesGrid';
import CrowdMonitor from './components/CrowdMonitor';
import DarshanQueue from './components/DarshanQueue';
import LoginPage from './components/LoginPage';
import { LanguageProvider } from './i18n/translations';

function AppContent() {
  const [crowd, setCrowd] = useState(null);
  const [darshan, setDarshan] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [temples, setTemples] = useState([]);
  const [stays, setStays] = useState([]);
  const [lastPing, setLastPing] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentItem, setPaymentItem] = useState(null);
  const [paymentType, setPaymentType] = useState('token');
  
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const [crowdRes, darshanRes, amenitiesRes, templesRes, staysRes] = await Promise.all([
        fetch('http://localhost:8000/api/crowd/feed').then(r => r.ok ? r.json() : null).catch(() => null),
        fetch('http://localhost:8000/api/darshan/timings').then(r => r.ok ? r.json() : []).catch(() => []),
        fetch('http://localhost:8000/api/amenities/list').then(r => r.ok ? r.json() : []).catch(() => []),
        fetch('http://localhost:8000/api/temples').then(r => r.ok ? r.json() : []).catch(() => []),
        fetch('http://localhost:8000/api/stays/hotels').then(r => r.ok ? r.json() : []).catch(() => [])
      ]);
      setCrowd(crowdRes);
      setDarshan(Array.isArray(darshanRes) ? darshanRes : []);
      setAmenities(Array.isArray(amenitiesRes) ? amenitiesRes : []);
      setTemples(Array.isArray(templesRes) ? templesRes : []);
      setStays(Array.isArray(staysRes) ? staysRes : []);
      setLastPing(new Date().toLocaleTimeString());
    } catch (err) {
      console.error("Fetch failure:", err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 4000);
    return () => clearInterval(interval);
  }, []);

  const openPayment = (item, type) => {
    if (!loggedIn) {
      navigate('/login');
      return;
    }
    setPaymentItem(item);
    setPaymentType(type);
    setPaymentModalOpen(true);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <Navbar lastPing={lastPing} loggedIn={loggedIn} />
      
      <Routes>
        <Route path="/" element={
          <>
            <UniversalSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <CrowdMonitor crowd={crowd} />
            <ChatbotWidget />
          </>
        } />
        <Route path="/temples" element={
          <>
            <UniversalSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <TempleCardGrid temples={temples} searchTerm={searchTerm} onGetToken={(temple) => openPayment(temple, 'token')} />
            <div style={{ marginBottom: '24px' }}>
              <DarshanQueue darshan={darshan} />
            </div>
            <ChatbotWidget />
          </>
        } />
        <Route path="/stays" element={
          <>
            <UniversalSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <NearbyStaysGrid stays={stays} searchTerm={searchTerm} onBookStay={(stay) => openPayment(stay, 'stay')} />
            <ChatbotWidget />
          </>
        } />
        <Route path="/amenities" element={
          <>
            <UniversalSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              <AmenitiesGrid amenities={amenities} searchTerm={searchTerm} />
            </div>
            <ChatbotWidget />
          </>
        } />
        <Route path="/login" element={
          <LoginPage setLoggedIn={setLoggedIn} />
        } />
      </Routes>

      <PaymentModal 
        isOpen={paymentModalOpen} 
        onClose={() => setPaymentModalOpen(false)} 
        item={paymentItem} 
        type={paymentType} 
      />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <LanguageProvider>
        <div style={{ 
          background: 'linear-gradient(135deg, #FFF8E7 0%, #FFE0B2 100%)', 
          minHeight: '100vh', 
          padding: '24px 16px', 
          fontFamily: 'Inter, sans-serif' 
        }}>
          <AppContent />
        </div>
      </LanguageProvider>
    </Router>
  );
}
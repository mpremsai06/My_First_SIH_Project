import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { useTranslation } from '../i18n/translations';

export default function ChatbotWidget() {
  const { lang, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const chips = [
    { text: "Where is Annaprasad?", displayKey: "whereIsAnnaprasad" },
    { text: "Crowd at Gate 2?", displayKey: "crowdGate2" },
    { text: "Report Tout / Scam", displayKey: "reportScam" },
    { text: "ఆలయ దర్శనం సమయం", displayKey: "darshanTime" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      handleSend("hello", true); // Trigger greeting
    }
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (text, isInitial = false) => {
    if (!text.trim() && !isInitial) return;
    
    const userMsg = { id: Date.now(), text: isInitial ? "hello" : text, sender: 'user' };
    if (!isInitial) {
      setMessages(prev => [...prev, userMsg]);
    }
    setInput('');

    try {
      const res = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, language: lang })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { id: Date.now() + 1, text: data.reply, sender: 'bot' }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { id: Date.now() + 1, text: "Error connecting to Rahbar AI.", sender: 'bot' }]);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed', bottom: '24px', right: '24px', 
          background: '#0284c7', color: 'white', border: 'none', 
          width: '60px', height: '60px', borderRadius: '30px', 
          boxShadow: '0 10px 15px -3px rgba(2,132,199,0.3)', cursor: 'pointer',
          display: isOpen ? 'none' : 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 999
        }}
      >
        <MessageSquare size={28} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            style={{
              position: 'fixed', bottom: '24px', right: '24px', 
              width: '350px', height: '500px', background: 'white', 
              borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
              display: 'flex', flexDirection: 'column', overflow: 'hidden', zIndex: 1000,
              border: '1px solid #e2e8f0'
            }}
          >
            <div style={{ background: '#0284c7', padding: '16px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Bot size={24} />
                <h3 style={{ margin: 0 }}>Rahbar Yatri Mitra</h3>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '16px', background: '#f8fafc' }}>
              {messages.filter(m => m.text !== 'hello' || m.sender === 'bot').map((msg) => (
                <div key={msg.id} style={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start', marginBottom: '12px' }}>
                  <div style={{ 
                    background: msg.sender === 'user' ? '#0284c7' : 'white', 
                    color: msg.sender === 'user' ? 'white' : '#334155',
                    padding: '10px 14px', borderRadius: '16px',
                    borderBottomRightRadius: msg.sender === 'user' ? '4px' : '16px',
                    borderBottomLeftRadius: msg.sender === 'bot' ? '4px' : '16px',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                    maxWidth: '80%', fontSize: '14px', lineHeight: '1.4'
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div style={{ padding: '12px', background: 'white', borderTop: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '8px', scrollbarWidth: 'none' }}>
                {chips.map((chip, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleSend(chip.text)}
                    style={{ whiteSpace: 'nowrap', background: '#e0f2fe', color: '#0284c7', border: 'none', padding: '6px 12px', borderRadius: '16px', fontSize: '12px', cursor: 'pointer' }}
                  >
                    {t(chip.displayKey)}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
                  placeholder="Ask something..."
                  style={{ flex: 1, padding: '10px 16px', borderRadius: '20px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px' }}
                />
                <button onClick={() => handleSend(input)} style={{ background: '#0284c7', color: 'white', border: 'none', width: '40px', height: '40px', borderRadius: '20px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import React, { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    appTitle: "🚩 Rahbar",
    appSubtitle: "Real-Time Pilgrim Assistance, Crowd Balancer & Anti-Surge Radar",
    sosButton: "SOS 112",
    telemetryLive: "Telemetry Live:",
    syncing: "Syncing...",
    searchPlaceholder: "Search temples, stays, amenities...",
    crowdLevel: "Crowd Level",
    waitTime: "Wait Time",
    nextOpen: "Next Open",
    navigate: "Navigate in Maps",
    getToken: "Get Token",
    bookStay: "Book Stay",
    roomsLeft: "Rooms Left",
    pricePerNight: "per night",
    rating: "Rating",
    templesTab: "Sacred Temples",
    staysTab: "Nearby Stays",
    paymentTitle: "Secure Checkout",
    payWith: "Pay with",
    successMsg: "Payment Successful! Generating Yatri Pass...",
    baseFee: "Base Fee",
    commission: "Platform Fee",
    total: "Total Amount",
    whereIsAnnaprasad: "Where is Annaprasad?",
    crowdGate2: "Crowd at Gate 2?",
    reportScam: "Report Tout / Scam",
    darshanTime: "Darshan Time",
    payWithBhim: "Pay with BHIM UPI ID",
    qrCodeSim: "Scan QR Code",
    amenitiesTitle: "Emergency & Amenities",
    general: "General",
    special: "Special",
    vip: "VIP"
  },
  hi: {
    appTitle: "🚩 रहबर",
    appSubtitle: "रियल-टाइम तीर्थयात्री सहायता और भीड़ नियंत्रण",
    sosButton: "आपातकाल 112",
    telemetryLive: "टेलीमेट्री लाइव:",
    syncing: "सिंक हो रहा है...",
    searchPlaceholder: "मंदिर, धर्मशाला, सुविधाएं खोजें...",
    crowdLevel: "भीड़ का स्तर",
    waitTime: "प्रतीक्षा समय",
    nextOpen: "अगला दर्शन",
    navigate: "मैप्स में नेविगेट करें",
    getToken: "टोकन प्राप्त करें",
    bookStay: "धर्मशाला बुक करें",
    roomsLeft: "कमरे उपलब्ध",
    pricePerNight: "प्रति रात्रि",
    rating: "रेटिंग",
    templesTab: "पवित्र मंदिर",
    staysTab: "आस-पास के निवास",
    paymentTitle: "सुरक्षित भुगतान",
    payWith: "के माध्यम से भुगतान करें",
    successMsg: "भुगतान सफल! यात्री पास जनरेट हो रहा है...",
    baseFee: "मूल शुल्क",
    commission: "प्लेटफॉर्म शुल्क",
    total: "कुल राशि",
    whereIsAnnaprasad: "अन्नप्रसाद कहाँ है?",
    crowdGate2: "गेट 2 पर भीड़?",
    reportScam: "दलाल / घोटाले की रिपोर्ट करें",
    darshanTime: "दर्शन का समय",
    payWithBhim: "BHIM UPI ID से भुगतान करें",
    qrCodeSim: "QR कोड स्कैन करें",
    amenitiesTitle: "आपातकाल और सुविधाएं",
    general: "सामान्य",
    special: "विशेष",
    vip: "वीआईपी"
  },
  te: {
    appTitle: "🚩 రహబర్",
    appSubtitle: "రియల్-టైమ్ యాత్రికుల సహాయం & రద్దీ నియంత్రణ",
    sosButton: "అత్యవసర 112",
    telemetryLive: "టెలిమెట్రీ లైవ్:",
    syncing: "సింక్ అవుతోంది...",
    searchPlaceholder: "ఆలయాలు, బస, సదుపాయాలను వెతకండి...",
    crowdLevel: "రద్దీ స్థాయి",
    waitTime: "నిరీక్షణ సమయం",
    nextOpen: "తదుపరి దర్శనం",
    navigate: "మ్యాప్స్‌లో నావిగేట్ చేయండి",
    getToken: "టోకెన్ పొందండి",
    bookStay: "బస బుక్ చేయండి",
    roomsLeft: "గదులు మిగిలి ఉన్నాయి",
    pricePerNight: "రాత్రికి",
    rating: "రేటింగ్",
    templesTab: "పవిత్ర దేవాలయాలు",
    staysTab: "సమీప బసలు",
    paymentTitle: "సురక్షిత చెల్లింపు",
    payWith: "దీనితో చెల్లించండి",
    successMsg: "చెల్లింపు విజయవంతమైంది! యాత్రి పాస్ రూపొందించబడుతోంది...",
    baseFee: "ప్రాథమిక రుసుము",
    commission: "ప్లాట్‌ఫారమ్ రుసుము",
    total: "మొత్తం",
    whereIsAnnaprasad: "అన్నప్రసాద్ ఎక్కడ ఉంది?",
    crowdGate2: "గేట్ 2 వద్ద రద్దీ?",
    reportScam: "స్కామ్ రిపోర్ట్ చేయండి",
    darshanTime: "ఆలయ దర్శనం సమయం",
    payWithBhim: "BHIM UPI ID తో చెల్లించండి",
    qrCodeSim: "QR కోడ్ స్కాన్ చేయండి",
    amenitiesTitle: "అత్యవసర మరియు సదుపాయాలు",
    general: "సాధారణ",
    special: "ప్రత్యేక",
    vip: "వీఐపీ"
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');

  const t = (key) => {
    return translations[lang][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);

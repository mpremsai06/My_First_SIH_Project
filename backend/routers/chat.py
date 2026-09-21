from fastapi import APIRouter
from pydantic import BaseModel
import re

router = APIRouter(prefix="/api/chat", tags=["chat"])

class ChatRequest(BaseModel):
    message: str
    language: str = "en"

@router.post("/")
def chat_endpoint(req: ChatRequest):
    msg = req.message.lower()
    lang = req.language

    # Default responses
    responses = {
        "en": "I'm Rahbar Yatri Mitra. How can I help you today?",
        "hi": "मैं रहबर यात्री मित्र हूँ। मैं आज आपकी कैसे मदद कर सकता हूँ?",
        "te": "నేను రహబర్ యాత్రి మిత్రను. ఈ రోజు నేను మీకు ఎలా సహాయపడగలను?"
    }

    if "annaprasad" in msg or "food" in msg:
        if lang == "hi":
            return {"reply": "अन्नप्रसाद हॉल 1 गेट 2 से 200 मीटर दूर है। भोजन अभी परोसा जा रहा है।"}
        elif lang == "te":
            return {"reply": "అన్నప్రసాద్ హాల్ 1 గేట్ 2 నుండి 200 మీటర్ల దూరంలో ఉంది. ఇప్పుడు ఆహారం అందించబడుతోంది."}
        return {"reply": "Annaprasad Hall 1 is 200m from Gate 2. Food is currently being served."}
        
    elif "crowd" in msg or "gate 2" in msg:
        if lang == "hi":
            return {"reply": "गेट 2 पर इस समय भारी भीड़ है। कृपया प्रतीक्षा करें या अन्य गेट का उपयोग करें।"}
        elif lang == "te":
            return {"reply": "గేట్ 2 వద్ద ప్రస్తుతం రద్దీ ఎక్కువగా ఉంది. దయచేసి వేచి ఉండండి లేదా ఇతర గేట్ ఉపయోగించండి."}
        return {"reply": "Gate 2 is currently experiencing heavy crowds. Please wait or use an alternative gate."}

    elif "tout" in msg or "scam" in msg or "report" in msg:
        if lang == "hi":
            return {"reply": "कृपया आधिकारिक काउंटरों से ही वीआईपी पास खरीदें। दलालों से सावधान रहें। कोई भी पास ट्रांसफर नहीं किया जा सकता।"}
        elif lang == "te":
            return {"reply": "దయచేసి అధికారిక కౌంటర్ల నుండి మాత్రమే వీఐపీ పాస్‌లను కొనుగోలు చేయండి. దళారులతో జాగ్రత్త."}
        return {"reply": "Please buy VIP passes only from official counters. Beware of touts. Passes are non-transferable."}

    elif "darshan" in msg or "సమయం" in msg or "time" in msg or "దర్శనం" in msg:
        if lang == "hi":
            return {"reply": "मुख्य गर्भगृह के लिए अनुमानित प्रतीक्षा समय 145 मिनट है। दर्शन अभी खुले हैं।"}
        elif lang == "te":
            return {"reply": "ప్రధాన గర్భగుడికి దర్శనం నిరీక్షణ సమయం సుమారు 145 నిమిషాలు. దర్శనం ఇప్పుడు తెరిచి ఉంది."}
        return {"reply": "The estimated wait time for the Main Sanctum is 145 minutes. Darshan is currently open."}
        
    elif "emergency" in msg or "sos" in msg or "medical" in msg:
        if lang == "hi":
            return {"reply": "आपात स्थिति के लिए कृपया 112 डायल करें। नजदीकी आपातकालीन केंद्र गेट 2 पर 50 मीटर दूर है।"}
        elif lang == "te":
            return {"reply": "అత్యవసర పరిస్థితులకు దయచేసి 112 కు కాల్ చేయండి. సమీప ఎమర్జెన్సీ సెంటర్ గేట్ 2 వద్ద 50 మీటర్ల దూరంలో ఉంది."}
        return {"reply": "For emergencies, please dial 112. The nearest Emergency Center is 50m away at Gate 2."}

    return {"reply": responses.get(lang, responses["en"])}

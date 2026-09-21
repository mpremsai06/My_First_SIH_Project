# pyrefly: ignore [missing-import]
from fastapi import APIRouter
from datetime import datetime
import random

router = APIRouter(prefix="/api/crowd", tags=["crowd"])

@router.get("/feed")
def get_live_crowd():
    # Simulates live camera headcounts fluctuating with real timestamps
    density = random.randint(45, 96)
    status = "CRITICAL" if density >= 90 else "HIGH" if density >= 75 else "MODERATE" if density >= 50 else "NORMAL"
    
    return {
        "timestamp": datetime.now().strftime("%H:%M:%S"),
        "zone": "Gate 3 - Mahadwar Access Way",
        "live_count": random.randint(1100, 1680),
        "capacity_percentage": density,
        "status": status,
        "cctv_fps": 24,
        "surge_detected": density > 75,
        "redirection": {
            "recommended": density > 70,
            "target": "Kalbhairav Sub-Shrine or Annaprasad Hall 2",
            "time_saved": "1 hour 35 mins"
        }
    }

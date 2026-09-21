from fastapi import APIRouter
import urllib.request
import json

router = APIRouter(prefix="/api/weather", tags=["weather"])

@router.get("/")
def get_weather(lat: float, lon: float):
    try:
        # Open-Meteo free API
        url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true"
        
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            
        current_weather = data.get("current_weather", {})
        temp = current_weather.get("temperature", 0)
        weathercode = current_weather.get("weathercode", 0)
        
        # Simple weather suggestion logic
        suggestion = "Perfect weather for Darshan!"
        if temp > 35:
            suggestion = "It's very hot. Carry water and wear light clothes."
        elif temp < 15:
            suggestion = "It's chilly. Carry a light jacket."
            
        if weathercode in [51, 53, 55, 61, 63, 65, 80, 81, 82]:
            suggestion = "Possibility of rain. Carry an umbrella."
            
        return {
            "temperature": temp,
            "suggestion": suggestion,
            "weathercode": weathercode
        }
    except Exception as e:
        return {
            "temperature": "N/A",
            "suggestion": "Weather data unavailable",
            "weathercode": 0
        }

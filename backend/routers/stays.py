# pyrefly: ignore [missing-import]
from fastapi import APIRouter
from database import get_db_connection

router = APIRouter(prefix="/api/stays", tags=["stays"])

@router.get("/hotels")
def get_hotel_radar():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, temple_id, name, type, price_per_night, rating, image_url, latitude, longitude, rooms_left FROM stays")
    rows = cursor.fetchall()
    conn.close()
    return [
        {
            "id": r["id"],
            "temple_id": r["temple_id"],
            "name": r["name"],
            "type": r["type"],
            "price_per_night": r["price_per_night"],
            "rating": r["rating"],
            "image_url": r["image_url"],
            "latitude": r["latitude"],
            "longitude": r["longitude"],
            "rooms_left": r["rooms_left"]
        }
        for r in rows
    ]


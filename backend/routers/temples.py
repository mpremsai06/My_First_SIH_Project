from fastapi import APIRouter
from database import get_db_connection

router = APIRouter(prefix="/api/temples", tags=["temples"])

@router.get("")
def get_temples():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, state, image_url, latitude, longitude, crowd_level, wait_time_mins, next_open_darshan FROM temples")
    rows = cursor.fetchall()
    conn.close()
    return [
        {
            "id": r["id"],
            "name": r["name"],
            "state": r["state"],
            "image_url": r["image_url"],
            "latitude": r["latitude"],
            "longitude": r["longitude"],
            "crowd_level": r["crowd_level"],
            "wait_time_mins": r["wait_time_mins"],
            "next_open_darshan": r["next_open_darshan"]
        }
        for r in rows
    ]

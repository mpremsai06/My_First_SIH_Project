# pyrefly: ignore [missing-import]
from fastapi import APIRouter
from database import get_db_connection

router = APIRouter(prefix="/api/amenities", tags=["amenities"])

@router.get("/list")
def get_amenities_list():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT name, category, status, distance, has_oxygen FROM amenities")
    rows = cursor.fetchall()
    conn.close()
    return [
        {
            "name": r["name"],
            "category": r["category"],
            "status": r["status"],
            "distance": r["distance"],
            "has_oxygen": bool(r["has_oxygen"])
        }
        for r in rows
    ]

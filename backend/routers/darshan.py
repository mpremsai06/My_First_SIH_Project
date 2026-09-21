# pyrefly: ignore [missing-import]
from fastapi import APIRouter
from database import get_db_connection

router = APIRouter(prefix="/api/darshan", tags=["darshan"])

@router.get("/timings")
def get_darshan_slots():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT temple_name, slot_time, status, wait_time_mins FROM darshan_slots")
    rows = cursor.fetchall()
    conn.close()
    return [{"temple": r["temple_name"], "slot": r["slot_time"], "status": r["status"], "wait_mins": r["wait_time_mins"]} for r in rows]

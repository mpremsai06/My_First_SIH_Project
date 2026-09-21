from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import init_db

from routers import crowd, darshan, stays, amenities, temples, chat, weather

app = FastAPI(title="Rahbar Real-Time Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database
init_db()

# Include routers
app.include_router(crowd.router)
app.include_router(darshan.router)
app.include_router(stays.router)
app.include_router(amenities.router)
app.include_router(weather.router)
app.include_router(temples.router)
app.include_router(chat.router)

@app.get("/")
def read_root():
    return {"message": "Rahbar API is running"}
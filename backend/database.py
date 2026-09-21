import sqlite3
import os

DB_FILE = os.path.join(os.path.dirname(__file__), "rahbar.db")

def get_db_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    
    # 1. Darshan Slots
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS darshan_slots (
            id INTEGER PRIMARY KEY,
            temple_name TEXT,
            slot_time TEXT,
            status TEXT,
            wait_time_mins INTEGER
        )
    """)
    
    # 2. Temples (NEW for SIH 2026)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS temples (
            id INTEGER PRIMARY KEY,
            name TEXT,
            state TEXT,
            image_url TEXT,
            latitude REAL,
            longitude REAL,
            crowd_level TEXT,
            wait_time_mins INTEGER,
            next_open_darshan TEXT
        )
    """)
    
    # 3. Stays (Replacing Hotels for SIH 2026)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS stays (
            id INTEGER PRIMARY KEY,
            temple_id INTEGER,
            name TEXT,
            type TEXT,
            price_per_night INTEGER,
            rating REAL,
            image_url TEXT,
            latitude REAL,
            longitude REAL,
            rooms_left INTEGER
        )
    """)

    # 4. Amenities
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS amenities (
            id INTEGER PRIMARY KEY,
            name TEXT,
            category TEXT,
            status TEXT,
            distance TEXT,
            has_oxygen BOOLEAN
        )
    """)

    # Insert initial mock records if empty
    cursor.execute("SELECT COUNT(*) FROM darshan_slots")
    if cursor.fetchone()[0] == 0:
        cursor.executemany("""
            INSERT INTO darshan_slots (temple_name, slot_time, status, wait_time_mins)
            VALUES (?, ?, ?, ?)
        """, [
            ("Main Sanctum (Garbhagriha)", "12:00 PM - 02:00 PM", "HEAVY CROWD", 145),
            ("North Corridor VIP Queue", "12:30 PM - 01:30 PM", "MODERATE", 45),
            ("Evening Aarti Hall", "06:30 PM - 08:00 PM", "SMOOTH FLOW", 20),
            ("Kalbhairav Auxiliary Shrine", "Open Access", "FAST / RECOMMENDED", 10),
        ])

    cursor.execute("SELECT COUNT(*) FROM temples")
    if cursor.fetchone()[0] == 0:
        cursor.executemany("""
            INSERT INTO temples (name, state, image_url, latitude, longitude, crowd_level, wait_time_mins, next_open_darshan)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, [
            ("Tirumala Venkateswara", "Andhra Pradesh", "https://images.unsplash.com/photo-1629858348633-89bd2925a072?q=80&w=600&auto=format&fit=crop", 13.6833, 79.3473, "Critical", 180, "02:00 PM"),
            ("Kashi Vishwanath", "Uttar Pradesh", "https://images.unsplash.com/photo-1632782782782-b7e1c15f913d?q=80&w=600&auto=format&fit=crop", 25.3109, 83.0107, "Moderate", 45, "Now"),
            ("Kedarnath Dham", "Uttarakhand", "https://images.unsplash.com/photo-1626244672439-012b189bfa81?q=80&w=600&auto=format&fit=crop", 30.7352, 79.0669, "Normal", 20, "04:00 PM"),
            ("Meenakshi Amman", "Tamil Nadu", "https://images.unsplash.com/photo-1594998064966-2d1e2e987c10?q=80&w=600&auto=format&fit=crop", 9.9195, 78.1193, "Moderate", 60, "Now"),
            ("Mahakaleshwar Jyotirlinga", "Madhya Pradesh", "https://images.unsplash.com/photo-1662990425624-9b16ea9825b2?q=80&w=600&auto=format&fit=crop", 23.1827, 75.7682, "Critical", 120, "11:00 PM"),
            ("Somnath Temple", "Gujarat", "https://images.unsplash.com/photo-1658428805903-82a170586eeb?q=80&w=600&auto=format&fit=crop", 20.8880, 70.4012, "Normal", 15, "Now"),
            ("Jagannath Temple", "Odisha", "https://images.unsplash.com/photo-1629205562723-5e92be9cb5bc?q=80&w=600&auto=format&fit=crop", 19.8048, 85.8179, "Critical", 150, "05:00 PM"),
            ("Badrinath Temple", "Uttarakhand", "https://images.unsplash.com/photo-1601058269784-5f5f4f89d38c?q=80&w=600&auto=format&fit=crop", 30.7446, 79.4930, "Moderate", 40, "06:00 AM"),
            ("Vaishno Devi", "Jammu & Kashmir", "https://images.unsplash.com/photo-1565018043441-267950cd23ef?q=80&w=600&auto=format&fit=crop", 33.0308, 74.9490, "Critical", 240, "Now"),
            ("Ramanathaswamy Temple", "Tamil Nadu", "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=600&auto=format&fit=crop", 9.2881, 79.3174, "Normal", 10, "Now"),
            ("Golden Temple", "Punjab", "https://images.unsplash.com/photo-1514222214438-66236fa783db?q=80&w=600&auto=format&fit=crop", 31.6200, 74.8765, "Moderate", 35, "Now"),
            ("Shirdi Sai Baba", "Maharashtra", "https://images.unsplash.com/photo-1635338166542-0f09b558509b?q=80&w=600&auto=format&fit=crop", 19.7668, 74.4764, "Critical", 180, "08:00 AM"),
            ("Shri Ram Janmabhoomi", "Uttar Pradesh", "https://images.unsplash.com/photo-1706001099279-b1ba27eddc86?q=80&w=600&auto=format&fit=crop", 26.7956, 82.1943, "Critical", 200, "10:00 AM"),
            ("Akshardham Temple", "Delhi", "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=600&auto=format&fit=crop", 28.6127, 77.2773, "Moderate", 45, "Now"),
            ("Dwarkadhish Temple", "Gujarat", "https://images.unsplash.com/photo-1629858348633-89bd2925a072?q=80&w=600&auto=format&fit=crop", 22.2377, 68.9674, "Normal", 20, "Now")
        ])

    cursor.execute("SELECT COUNT(*) FROM stays")
    if cursor.fetchone()[0] == 0:
        cursor.executemany("""
            INSERT INTO stays (temple_id, name, type, price_per_night, rating, image_url, latitude, longitude, rooms_left)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, [
            (1, "Srinivasa Dharamshala", "Dharamshala", 450, 4.2, "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop", 13.6820, 79.3480, 14),
            (1, "Tirupati Trust Bhawan", "Dharamshala", 1100, 3.8, "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=600&auto=format&fit=crop", 13.6850, 79.3500, 5),
            (2, "Ganga View Homestay", "Homestay", 1200, 4.5, "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?q=80&w=600&auto=format&fit=crop", 25.3115, 83.0110, 2),
            (2, "Kashi Govt Guest House", "Govt Guest House", 2500, 4.3, "https://images.unsplash.com/photo-1618773928120-22c608f65eb0?q=80&w=600&auto=format&fit=crop", 25.3150, 83.0050, 8),
            (3, "Kedarnath Rest House", "Dharamshala", 800, 3.9, "https://images.unsplash.com/photo-1551882547-ff40c0d129df?q=80&w=600&auto=format&fit=crop", 30.7350, 79.0665, 6),
            (4, "Meenakshi Niwas", "Homestay", 600, 4.1, "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=600&auto=format&fit=crop", 9.9200, 78.1180, 20),
            (4, "Madurai Trust Dharamshala", "Dharamshala", 900, 3.5, "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=600&auto=format&fit=crop", 9.9250, 78.1150, 12),
            (5, "Mahakal Ashraya", "Dharamshala", 500, 4.3, "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=600&auto=format&fit=crop", 23.1830, 75.7690, 8),
            (5, "Ujjain Heritage Homestay", "Homestay", 1400, 4.0, "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=600&auto=format&fit=crop", 23.1800, 75.7700, 4),
            (6, "Sagar Darshan Guest House", "Govt Guest House", 1500, 4.6, "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=600&auto=format&fit=crop", 20.8870, 70.4020, 3),
            (7, "Puri Niwas", "Homestay", 400, 4.4, "https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=600&auto=format&fit=crop", 19.8050, 85.8180, 25),
            (7, "Puri Beach Trust", "Dharamshala", 1800, 4.1, "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=600&auto=format&fit=crop", 19.7980, 85.8250, 10),
            (8, "Badrinath Lodge", "Homestay", 1000, 3.7, "https://images.unsplash.com/photo-1542314831-c6a4d27ce002?q=80&w=600&auto=format&fit=crop", 30.7450, 79.4900, 2),
            (9, "Katra Bhawan", "Dharamshala", 200, 4.5, "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=600&auto=format&fit=crop", 33.0300, 74.9500, 50),
            (9, "Katra Govt Guest House", "Govt Guest House", 3500, 4.6, "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=600&auto=format&fit=crop", 33.0280, 74.9450, 7),
            (10, "Rameshwaram Trust", "Dharamshala", 350, 4.2, "https://images.unsplash.com/photo-1551882547-ff40c0d129df?q=80&w=600&auto=format&fit=crop", 9.2880, 79.3170, 15),
            (11, "Golden Temple Sarai", "Dharamshala", 100, 4.8, "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop", 31.6200, 74.8765, 100),
            (12, "Sai Ashram", "Dharamshala", 300, 4.6, "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=600&auto=format&fit=crop", 19.7660, 74.4760, 40),
            (12, "Shirdi Homestay", "Homestay", 1200, 3.9, "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?q=80&w=600&auto=format&fit=crop", 19.7680, 74.4750, 18),
            (13, "Ayodhya Stay", "Homestay", 800, 4.5, "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop", 26.7960, 82.1950, 10),
            (14, "Delhi Govt Guest House", "Govt Guest House", 1500, 4.2, "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=600&auto=format&fit=crop", 28.6130, 77.2780, 5),
            (15, "Dwarka Inn", "Homestay", 950, 4.1, "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?q=80&w=600&auto=format&fit=crop", 22.2380, 68.9680, 8)
        ])

    cursor.execute("SELECT COUNT(*) FROM amenities")
    if cursor.fetchone()[0] == 0:
        cursor.executemany("""
            INSERT INTO amenities (name, category, status, distance, has_oxygen)
            VALUES (?, ?, ?, ?, ?)
        """, [
            ("Annaprasad Hall 1", "Food", "Serving", "200m", False),
            ("City Hospital", "Medical", "Open 24/7", "1.5km", True),
            ("Gate 2 Emergency Center", "Emergency", "Active", "50m", True),
            ("Central Police Station", "Police", "Active", "500m", False),
            ("Sanjivani Pharmacy", "Medical Store", "Open", "300m", True)
        ])

    conn.commit()
    conn.close()

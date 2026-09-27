# Rahbar - Smart Temple Management System 🛕✨

**Rahbar** (meaning "Guide") is a comprehensive, smart temple management and visitor assistance platform built for the **Smart India Hackathon (SIH)**. It is designed to enhance the pilgrimage experience by providing real-time information, seamless bookings, and a multilingual guide system.

## 🚀 Key Features

- **Live Crowd Monitoring**: Real-time updates on crowd density to help visitors plan their visits efficiently.
- **Darshan Queue Management**: Live tracking of queue timings and expected waiting periods for different temples.
- **Temple Information & Token Booking**: Explore details about various temples and easily book Darshan tokens online.
- **Nearby Stays & Amenities**: Discover and reserve nearby hotels, and locate essential amenities (washrooms, parking, food stalls).
- **Multilingual Support**: Fully localized interface supporting multiple languages to cater to diverse pilgrims.
- **AI Chatbot Widget**: An integrated virtual assistant to answer visitor queries instantly.
- **Universal Search**: Quickly find temples, stays, and amenities using a unified search bar.
- **Payment Integration**: Streamlined modal for secure and quick checkout for tokens and reservations.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React.js](https://reactjs.org/) (v18)
- **Routing**: [React Router](https://reactrouter.com/) (v7)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend
- **Language**: Python 3.11
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (RESTful API architecture)
- **Architecture**: Modular routing (`/api/crowd`, `/api/darshan`, `/api/temples`, `/api/stays`, `/api/amenities`)

## 📂 Project Structure

```
rahbar-project/
├── frontend/             # React application frontend
│   ├── public/           # Static assets
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── i18n/         # Internationalization & translations
│   │   ├── App.js        # Main application routing and state
│   │   └── index.js      # React entry point
│   └── package.json      # Frontend dependencies
├── backend/              # Python FastAPI backend
│   ├── routers/          # API route handlers
│   ├── data/             # Database / static data sources
│   └── main.py           # Application entry point
└── .gitignore            # Git ignored files
```

## 💻 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [Python](https://www.python.org/) (v3.11+)

### Running the Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:3000`.

### Running the Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Set up a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install required Python packages (e.g., FastAPI, Uvicorn):
   ```bash
   pip install fastapi uvicorn
   ```
4. Start the backend server:
   ```bash
   uvicorn main:app --reload
   ```
   The API will be available at `http://localhost:8000`.

---
*Built with ❤️ for Smart India Hackathon.*

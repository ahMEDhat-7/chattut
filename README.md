# Chattut

**Chattut** is a modern real-time chat app.

---


## Tech Stack

- **React** – Component-based UI
- **TailwindCSS** – Utility-first styling
- **Socket.IO** – Real-time WebSocket communication
- **Express.js** – Simple backend server
- **Node.js** – Backend runtime environment

---

##  Features

-  Real-time chat with WebSocket magic
-  Join/leave user notifications
-  Clean and responsive UI with Tailwind
-  Mobile-friendly layout
-  Fast local setup
-  Docker support for easy deployment

---

## Installation

### Prerequisites
- Node.js (v18+)
- Docker & Docker Compose (for containerized setup)
- MongoDB (or use Docker)

### Option 1: Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ahMEDhat-7/chattut.git
   cd chattut
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```
   
   Create a `.env` file in the `backend` folder:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_DB_URL=mongodb://admin:password@localhost:27017/chattut?authSource=admin
   JWT_SECRET_KEY=your_jwt_secret_key_here
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Run the application**
   - Backend: `cd backend && npm run dev`
   - Frontend: `cd frontend && npm run dev`

### Option 2: Docker Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ahMEDhat-7/chattut.git
   cd chattut
   ```

2. **Configure environment**
   Update `.env` in the `backend` folder with your credentials (see Option 1)

3. **Start with Docker Compose**
   ```bash
   docker compose up -d --build
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

5. **Stop the application**
   ```bash
   docker compose down
   ```

---

## Environment Variables

The backend requires the following environment variables (configured in `.env`):

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 5000) |
| `NODE_ENV` | Environment mode (development/production) |
| `MONGO_DB_URL` | MongoDB connection string |
| `JWT_SECRET_KEY` | Secret key for JWT token signing |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name for image uploads |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

---

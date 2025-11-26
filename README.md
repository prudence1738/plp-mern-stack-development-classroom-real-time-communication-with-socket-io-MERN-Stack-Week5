# Real-Time Chat App (Week 5 — Socket.io)

## Overview
This is a real-time chat application built with **Node.js, Express, Socket.io, MongoDB, and React**.  
It demonstrates bidirectional communication between clients and server with live messaging, online status, typing indicators, and notifications.


## Project Structure

```
socketio-chat/
├── client/                 # React front-end
│   ├── public/             # Static files
│   ├── src/                # React source code
│   │   ├── components/     # UI components
│   │   ├── context/        # React context providers
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Page components
│   │   ├── socket/         # Socket.io client setup
│   │   └── App.jsx         # Main application component
│   └── package.json        # Client dependencies
├── server/                 # Node.js back-end
│   ├── config/             # Configuration files
│   ├── controllers/        # Socket event handlers
│   ├── models/             # Data models
│   ├── socket/             # Socket.io server setup
│   ├── utils/              # Utility functions
│   ├── server.js           # Main server file
│   └── package.json        # Server dependencies
└── README.md               # Project documentation
```
## Features Implemented

### Core Features
- ✅ User Authentication (simple username-based login with JWT)  
- ✅ Global Chat Room (all users can send/receive messages)  
- ✅ Display Messages (sender name + timestamp)  
- ✅ Typing Indicator  
- ✅ Online/Offline Status  

### Advanced Features
- ✅ Private Messaging (direct messages between users)  
- ✅ Multiple Chat Rooms / Channels  
- ✅ Message Delivery Acknowledgment  
- ✅ Read Receipts (`readBy` tracking)  
- ✅ Message Reactions  
- ✅ Browser Notifications for new messages  
- ✅ Typing Notifications per room
- 

## Requirements

- Node.js (v18 or higher)
- npm or yarn
- Modern web browser
- Basic understanding of React and Express

  
## Setup Instructions

### 1. Clone Repository
```bash
git clone <your-repo-url>
```

### 2. Backend Setup
```bash
cd server
npm install
cp .env.example .env
# Edit .env and set MONGO_URL and JWT_SECRET
npm run dev
```

### 3. Frontend Setup
```bash
cd client
npm install
# If using local server:
npm run dev
# Visit http://localhost:5173 (Vite default port)
```

##### 4. Testing Real-Time Features
- Open multiple browser tabs or devices  
- Login with different usernames  
- Send messages, check typing indicator, online/offline status  
- Observe private messages (if implemented)  
- Browser notifications appear when receiving new messages

  
## Deployment Notes
- Backend: Render, Railway, or Heroku  
- Frontend: Vercel, Netlify, or GitHub Pages  
- Ensure environment variables (`MONGO_URL`, `JWT_SECRET`) are correctly set  
- Update `REACT_APP_SERVER_URL` for production in frontend  


## Resources

- [Socket.io Documentation](https://socket.io/docs/v4/)
- [React Documentation](https://react.dev/)
- [Express.js Documentation](https://expressjs.com/)
- [Building a Chat Application with Socket.io](https://socket.io/get-started/chat) 

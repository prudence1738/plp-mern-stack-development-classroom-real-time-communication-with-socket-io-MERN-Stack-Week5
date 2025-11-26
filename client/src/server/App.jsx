import { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");

function App() {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);

  // Load messages on start
  useEffect(() => {
    axios.get("http://localhost:5000/api/chat/messages").then((res) => {
      setMessages(res.data);
    });
  }, []);

  // SOCKET LISTENERS
  useEffect(() => {
    socket.on("receive-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("typing", (username) => {
      setTypingUser(username);
      setTimeout(() => setTypingUser(""), 1500);
    });

    socket.on("online-users", (users) => {
      setOnlineUsers(users);
    });
  }, []);

  // LOGIN
  const handleLogin = async () => {
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      username,
    });

    setToken(res.data.token);
    setLoggedIn(true);

    // Authenticate socket
    socket.emit("auth", res.data.token);

    // Join global chat automatically
    socket.emit("join-room", "global");
  };

  // SEND MESSAGE
  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("send-message", {
      text: message,
      room: "global",
    });

    setMessage("");
  };

  // TYPING INDICATOR
  const handleTyping = () => {
    socket.emit("typing", "global");
  };

  if (!loggedIn) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Enter username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleLogin}>Join Chat</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome, {username}</h2>

      <h3>Online Users:</h3>
      <ul>
        {onlineUsers.map((u) => (
          <li key={u}>{u}</li>
        ))}
      </ul>

      <div style={{ marginTop: "20px" }}>
        <h3>Global Chat</h3>

        <div
          style={{
            height: "300px",
            overflowY: "scroll",
            border: "1px solid #ccc",
            padding: "10px",
          }}
        >
          {messages.map((msg, i) => (
            <p key={i}>
              <strong>{msg.sender}:</strong> {msg.text}
            </p>
          ))}
        </div>

        {typingUser && <p>{typingUser} is typing...</p>}

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
          placeholder="Type your message..."
        />

        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;

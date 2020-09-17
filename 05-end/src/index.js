import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function App() {
  const [messages, setMessages] = useState([]);

  // when the app mounts, connect the websocket
  useEffect(() => {
    console.log('connected');
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (msg) => {
      console.log('got', msg.data);
      setMessages((oldMessages) => [...oldMessages, msg.data]);
    };

    return () => ws.close();
  }, []);

  return (
    <div>
      <h2>Websocket Demo</h2>
      {messages.map((msg) => (
        <div key={msg}>{msg}</div>
      ))}
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector('#root'));

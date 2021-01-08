import React, {useState} from "react";
import './App.css';
import { io } from 'socket.io-client';
import FrontPage from './initiallogin/FrontPage';
import Screen from "./main-app/Screen";

const SERVER_URL = 'http://localhost:5000';

function App() {
  // Socket.io connections between client and server
  const socket = io(SERVER_URL, {
    withCredentials: true,
    extraHeaders: {
      'my-custom-header': 'abcd',
    },
  });

  socket.on('connected', (message) => {
    console.log(message);
  });

  const [initialScreen, setScreen] = useState(true);

  return (
    <div className="App">
      {initialScreen && <FrontPage setScreen={() => setScreen(false)} /> }
      {!initialScreen && <Screen /> }
    </div>
  );
}

export default App;

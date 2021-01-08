import React, { useEffect, useState } from 'react';
import './App.css';
import io from 'socket.io-client';
import GoogleMap from './components/GoogleMap';
import NameHolder from './components/nameholder/NameHolder';
import LoginModal from './loginmodal/LoginModal';

const SERVER_URL = 'http://localhost:5000';
export const StateContext = React.createContext({});

function App() {
  useEffect(() => {
    const socket = io('http://localhost:5000', {
      withCredentials: true,
      extraHeaders: {
        'my-custom-header': 'abcd',
      },
    });

    socket.on('connect', (message) => {
      console.log('A new user has connected');
    });

    socket.on('status', (msg) => {
      console.log(msg);
    });

    socket.emit('inputUser', {
      username: 'test',
      lat: '0000',
      long: '20000',
      avatar: 'male1',
    });

    socket.on('outputUser', (users) =>
      users.map((user) => console.log('user ' + user.username + ' joined'))
    );

    socket.emit('inputMessage', {
      text: 'Hello to you too!',
    });

    socket.emit('inputPosition', {
      lat: '1200',
      long: '3000',
    });

    socket.on('outputPosition', (users) => {
      users.map((user) =>
        console.log('user ' + user.username + ' moved to ' + user.long + ' ' + user.lat)
      );
    });

    socket.on('onlineUsers', (number) => {
      console.log('users: ' + number);
    });

    socket.on('outputMessage', (messages) => {
      messages.map((message) => console.log(message.text));
    });

    socket.on('userLeft', (userId) => console.log('user ' + userId + ' left'));

    const isInitialized = window.localStorage.getItem('initialized');
    if (isInitialized) {
      setScreen(false);
    }
  }, []);

  // Coordinates
  const currLocation = { lat: 1.3521, lng: 103.8198 };
  const [coordinates, setCoordinates] = useState(currLocation);

  // Global variables
  const [initialScreen, setScreen] = useState(true);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');

  const contextProviderValue = {
    name,
    setName,
    image,
    setImage,
  };

  return (
    <div className="App">
      <StateContext.Provider value={contextProviderValue}>
        {initialScreen && <LoginModal />}
        <NameHolder />
        <GoogleMap center={coordinates} zoom={15} />
        <button
          className="recenter-button"
          onClick={() => {
            console.log('CLICKED');
            setCoordinates(currLocation);
          }}
        >
          RE-CENTER
        </button>
      </StateContext.Provider>
    </div>
  );
}

export default App;

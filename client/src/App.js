import React, { useEffect, useState } from 'react';
import './App.css';
import io from 'socket.io-client';
import GoogleMap from './components/GoogleMap';
import NameHolder from './component/nameholder/NameHolder';
import LoginModal from './loginmodal/LoginModal';

const SERVER_URL = 'http://localhost:5000';
export const StateContext = React.createContext({});

function App() {
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
  });

  socket.on('outputUser', (users) =>
    users.map((user) => console.log('user ' + user.username + ' joined'))
  );

  socket.emit('inputMessage', {
    username: 'Dhafin',
    text: 'Hello to you too!',
  });

  socket.emit('inputPosition', {
    username: 'test',
    lat: '1200',
    long: '3000',
  });

  socket.on('outputPosition', (users) => {
    users.map((user) =>
      console.log('user ' + user.username + ' moved to ' + user.long + ' ' + user.lat)
    );
  });

  socket.on('outputMessage', (messages) => {
    messages.map((message) => console.log(message.text));
  });

  socket.on('userLeft', (userId) => console.log('user ' + userId + ' left'));

  const currLocation = { lat: 1.3521, lng: 103.8198 };

  // Global variables
  const [coordinates, setCoordinates] = useState(currLocation);
  const [initialScreen, setScreen] = useState(true);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');

  const contextProviderValue = {
    name,
    setName,
    image,
    setImage,
  };

  useEffect(() => {
    const isInitialized = window.localStorage.getItem('initialized');
    if (isInitialized) {
      setScreen(false);
    }
  }, []);

  return (
    <div className="App">
      <StateContext.Provider value={contextProviderValue}>
        <NameHolder />
        {!initialScreen && <LoginModal />}
        <GoogleMap center={coordinates} zoom={15} />
        <button
          className={'recenter-button'}
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

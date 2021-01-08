import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import './App.css';
import logo from './HelloWorldLogo.svg';
import { fakeUsers } from './util/fakeUsers';
import NameHolder from './components/nameholder/NameHolder';
import LoginModal from './loginmodal/LoginModal';
import GoogleMap from './components/GoogleMap';

const SERVER_URL = 'http://localhost:5000';
export const StateContext = React.createContext({});

const SG_POSITION = { lat: 1.3521, lng: 103.8198 };

function App() {
  // Global Variables
  const [initialScreen, setScreen] = useState(true);
  const [name, setName] = useState('');
  const [image, setImage] = useState('boy1');
  const [mapOptions, setMapOptions] = useState(null);

  const [users, setUsers] = useState(fakeUsers);
  const [numOnline, setNumOnline] = useState(0);
  const [messages, setMessages] = useState([]);

  const [isUserInputted, setIsUserInputted] = useState(false);

  // Map Coordinates
  const [currLocation, setCurrLocation] = useState(SG_POSITION);

  useEffect(() => {
    const socket = io(SERVER_URL, {
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

    socket.on('outputUser', (allUsers) => {
      allUsers.map((user) => console.log('user ' + user.username + ' joined'));
      setUsers({ ...users, allUsers });
    });

    socket.on('outputPosition', (newUsers) => {
      newUsers.map((user) =>
        console.log('user ' + user.username + ' moved to ' + user.long + ' ' + user.lat)
      );
      const ids = new Set(newUsers.map((u) => u.id));
      setUsers([...newUsers, ...users.filter((u) => !ids.has(u.id))]);
    });

    socket.on('onlineUsers', (number) => {
      console.log('users: ' + number);
      setNumOnline(number);
    });

    socket.on('userLeft', (userId) => {
      console.log('user ' + userId + ' left' + ' called by ' + socket.id);
      setUsers([...users.filter((u) => u.id !== userId)]);
    });

    socket.on('outputMessage', (messages) => {
      messages.map((message) => console.log(message.text));
      setMessages(messages);
    });

    // get location
    if ('geolocation' in navigator) {
      console.log('Location enabled');

      navigator.geolocation.getCurrentPosition((position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCurrLocation(location);
        setMapOptions({ center: location, zoom: 15 });

        // console.log('user inputted');
        // // add user
        // socket.emit('inputUser', {
        //   username: name,
        //   avatar: image,
        //   ...location,
        // });
      });

      if (isUserInputted) {
        navigator.geolocation.watchPosition((position) => {
          console.log('geolocation changed');
          if (
            currLocation.lat !== position.coords.latitude ||
            currLocation.lng !== position.coords.longitude
          ) {
            const location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            setCurrLocation(location);
            console.log(location);
            socket.emit('inputPosition', location);
          }
        });
      }
    } else {
      console.log('Location disabled');
      // socket.emit('inputUser', {
      //   username: name,
      //   avatar: image,
      //   ...currLocation,
      // });
    }

    // socket.emit('inputMessage', {
    //   text: "Hello everybody, I'm " + name,
    // });

    // const isInitialized = window.localStorage.getItem('initialized');
    // if (isInitialized) {
    //   setScreen(false);
    // }
  }, []);

  const contextProviderValue = {
    name,
    setName,
    image,
    setImage,
    mapOptions,
    setMapOptions,
    setIsUserInputted,
  };

  return (
    <div className="App">
      <StateContext.Provider value={contextProviderValue}>
        {initialScreen && <LoginModal />}
        <NameHolder />
        <GoogleMap users={users} />
        <button
          className={'recenter-button'}
          onClick={() => setMapOptions({ center: currLocation, zoom: 15 })}
        >
          RE-CENTER
        </button>
      </StateContext.Provider>
      {/*<p className="app-name">HELLO WORLD!</p>*/}
    </div>
  );
}

export default App;

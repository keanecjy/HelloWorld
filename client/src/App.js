import React, { useEffect, useState } from 'react';
import './App.css';
import FrontPage from './initiallogin/FrontPage';
import Screen from './main-app/Screen';

function App() {

  // const socket = io("http://localhost:5000", {
  //   withCredentials: true,
  //   extraHeaders: {
  //     "my-custom-header": "abcd",
  //   },
  // });

  // socket.on("connected", (message) => {
  //   console.log("user connected");
  // });

  // socket.on("status", (msg) => {
  //   console.log(msg);
  // });

  // socket.emit("inputUser", {
  //   username: "test",
  //   lat: "0000",
  //   long: "20000",
  // });

  // socket.on("outputUser", (users) =>
  //   users.map((user) => console.log("user " + user.username + " joined"))
  // );

  // socket.emit("inputMessage", { username: "", text: "Hello to you too!" });

  // socket.emit("inputMessage", { username: "Dhafin", text: "" });

  // socket.emit("inputMessage", { username: "Frank", text: "Hello!" });

  // socket.emit("inputMessage", {
  //   username: "Dhafin",
  //   text: "Hello to you too!",
  // });

  // socket.emit("inputPosition", {
  //   username: "test",
  //   lat: "1200",
  //   long: "3000",
  // });

  // socket.on("outputPosition", (users) => {
  //   users.map((user) =>
  //     console.log(
  //       "user " + user.username + " moved to " + user.long + " " + user.lat
  //     )
  //   );
  // });

  // socket.on("outputMessage", (messages) => {
  //   messages.map((message) => console.log(message.text));
  // });

  // socket.on("userLeft", (userId) => console.log("user " + userId + " left"));

  const [initialScreen, setScreen] = useState(true);

  useEffect(() => {
    const isInitialized = window.localStorage.getItem('initialized');
    if (isInitialized) {
      setScreen(false);
    }
  }, []);

  return (
    <div className="App">
      {initialScreen && <FrontPage setScreen={() => setScreen(false)} />}
      {!initialScreen && <Screen />}
    </div>
  );
}

export default App;

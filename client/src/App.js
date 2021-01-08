import React, { useState, useEffect } from "react";
import logo from "./HelloWorldLogo.svg";
import "./App.css";
import io from "socket.io-client";
import GoogleMap from "./components/GoogleMap";
import GoogleMapReact from "google-map-react";
import { defaultStartCoords, fakeUsers } from "./util/fakeUsers";

const SERVER_URL = "http://localhost:5000";

function App() {
  useEffect(() => {
    const socket = io("http://localhost:5000", {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd",
      },
    });

    socket.on("connect", (message) => {
      console.log("A new user has connected");
    });

    socket.on("status", (msg) => {
      console.log(msg);
    });

    socket.emit("inputUser", {
      username: "test",
      lat: "0000",
      long: "20000",
      avatar: "male1",
    });

    socket.on("outputUser", (users) =>
      users.map((user) => console.log("user " + user.username + " joined"))
    );

    socket.emit("inputMessage", {
      text: "Hello to you too!",
    });

    socket.emit("inputPosition", {
      lat: "1200",
      long: "3000",
    });

    socket.on("outputPosition", (users) => {
      users.map((user) =>
        console.log(
          "user " + user.username + " moved to " + user.long + " " + user.lat
        )
      );
    });

    socket.on("outputMessage", (messages) => {
      messages.map((message) => console.log(message.text));
    });

    socket.on("userLeft", (userId) => console.log("user " + userId + " left"));
  }, []);

  const currLocation = { lat: 1.3521, lng: 103.8198 };
  const [coordinates, setCoordinates] = useState(currLocation);

  return (
    <div className="App">
      <GoogleMap center={coordinates} zoom={15} />
      <button
        className={"recenter-button"}
        onClick={() => {
          console.log("CLICKED");
          setCoordinates(currLocation);
        }}
      >
        RE-CENTER
      </button>
    </div>
  );
}

export default App;

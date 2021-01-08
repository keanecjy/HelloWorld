import React, {useState, useEffect} from 'react';
import logo from "./HelloWorldLogo.svg";
import "./App.css";
import {io} from "socket.io-client";
import GoogleMap from "./components/GoogleMap";
import GoogleMapReact from "google-map-react";
import {defaultStartCoords, fakeUsers} from "./util/fakeUsers";

const SERVER_URL = "http://localhost:5000";

// const { io } = window["socket.io-3.0.5.min"];

function App() {
    console.log(window);
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
    const currLocation = {lat: 1.3521, lng: 103.8198}
    // socket.on("userLeft", (userId) => console.log("user " + userId + " left"));
    const [coordinates, setCoordinates] = useState(currLocation);
    // useEffect((center) => {
    //     setCoordinates(center);
    // });

    return (
        <div className="App">
            {/*<header className="App-header">*/}
            {/*    <img src={logo} className="App-logo" alt="logo"/>*/}
            {/*    <br/>*/}
            {/*    <p>*/}
            {/*        <strong> Welcome to HelloWorld </strong>*/}
            {/*    </p>*/}
            {/*    <p>*/}
            {/*        <strong> The world's most engaging map </strong>*/}
            {/*    </p>*/}
            {/*</header>*/}
            <GoogleMap center={coordinates} zoom={15}/>
            <button className={"recenter-button"} onClick={() => {
                console.log("CLICKED");
                setCoordinates(currLocation)
            }}>RE-CENTER</button>
        </div>
    );
}

export default App;

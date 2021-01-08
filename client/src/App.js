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
    const currLocation = {lat: 1.3521, lng: 103.8198}
    const [coordinates, setCoordinates] = useState(currLocation);

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

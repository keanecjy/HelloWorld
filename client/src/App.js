import React, {useState, useEffect} from 'react';
import logo from "./HelloWorldLogo.svg";
import "./App.css";
import openSocket from "socket.io-client";
import UserPin from "./components/MapObject/UserPin";
import Cluster from "./components/MapObject/Cluster";
import GoogleMapReact from "google-map-react";
import supercluster from "points-cluster";
import {fakeUsers} from "./util/fakeUsers";
import {map} from "ramda";

const SERVER_URL = "http://localhost:5000";

// const { io } = window["socket.io-3.0.5.min"];
const socket = openSocket(SERVER_URL);
const SG_POSITION = {lat: 1.3521, lng: 103.8198};

function createMapOptions(maps) {
    return {
        zoomControlOptions: {
            position: maps.ControlPosition.LEFT_CENTER,
            style: maps.ZoomControlStyle.SMALL
        },
    }
}

function App() {
    const [username, setUsername] = useState("John");
    const [avatar, setAvatar] = useState("male1");
    const [users, setUsers] = useState(fakeUsers);

    const [currLocation, setCurrLocation] = useState(SG_POSITION);
    const [mapOptions, setMapOptions] = useState(null);
    const [clusters, setClusters] = useState([]);

    // componentDidMount
    useEffect(() => {
        if ("geolocation" in navigator) {
            console.log("Location enabled");

            navigator.geolocation.getCurrentPosition(position => {
                const location = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
                setCurrLocation(location);
                setMapOptions({center: location, zoom: 15})
                // add user
                const newUser = {username: username, avatar: avatar, ...location}
                socket.emit("inputUser", newUser);
            })

            navigator.geolocation.watchPosition(position => {
                if (currLocation.lat !== position.coords.latitude || currLocation.lng !== position.coords.longitude) {
                    setCurrLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                    const inputPos = {...currLocation, username: username}
                    socket.emit("inputPosition", inputPos)
                }
            })
        } else {
            console.log("Location disabled");
        }

        socket.on("outputUser", allUsers => {
            console.log("outputUser", allUsers)
            setUsers(allUsers)
        });
        socket.on("outputPosition", newUsers => {
            console.log("outputPosition", newUsers)
            const ids = new Set(newUsers.map(u => u.id));
            setUsers([...newUsers, ...users.filter(u => !ids.has(u.id))]);
        });
        socket.on("userLeft", userId => {
            console.log("userLeft", userId)
            setUsers([...users.filter(u => u.id !== userId)])
        });

        // socket.on("outputMessage", messages => {
        //
        // });
    }, [])

    useEffect(() => {
        if (mapOptions && mapOptions.bounds) {
            const clusters = supercluster(users, {
                minZoom: 0,
                maxZoom: 16,
                radius: 60,
            });

            console.log(mapOptions)
            setClusters(clusters(mapOptions)
                .map(({wx, wy, numPoints, points}) => ({
                    lat: wy,
                    lng: wx,
                    numPoints: numPoints,
                    id: `${numPoints}_${points[0].id}`,
                    points: points,
                }))
            );
        }
    }, [mapOptions]);

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
            <div className={"google-map"}>
                {mapOptions && <GoogleMapReact
                    bootstrapURLKeys={{key: process.env.REACT_APP_GMAPS_API}}
                    center={mapOptions.center}
                    zoom={mapOptions.zoom}
                    onChange={({center, zoom, bounds}) => setMapOptions({center, zoom, bounds})}
                    yesIWantToUseGoogleMapApiInternals={true}
                    options={createMapOptions}
                >
                    {clusters.map(groups => {
                        if (groups.numPoints === 1) {
                            return (
                                <UserPin
                                    lat={groups.points[0].lat}
                                    lng={groups.points[0].lng}
                                    details={groups.points[0].details}
                                    key={groups.id}
                                />
                            );
                        } else {
                            return (
                                <Cluster
                                    lat={groups.lat}
                                    lng={groups.lng}
                                    key={groups.id}
                                    numPoints={groups.numPoints}
                                />
                            );
                        }
                    })}
                </GoogleMapReact>}
            </div>
            <button className={"recenter-button"}
                    onClick={() => setMapOptions({center: currLocation, zoom: 15})}>RE-CENTER
            </button>
        </div>
    );
}

export default App;

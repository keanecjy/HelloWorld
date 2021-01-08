import React, {useState, useEffect} from "react";
import logo from "./HelloWorldLogo.svg";
import "./App.css";
import io from "socket.io-client";
import GoogleMapReact from "google-map-react";
import {fakeUsers} from "./util/fakeUsers";
import UserPin from "./components/MapObject/UserPin";
import Cluster from "./components/MapObject/Cluster";
import supercluster from "points-cluster";

const SERVER_URL = "http://localhost:5000";

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
    const [numOnline, setNumOnline] = useState(0);
    const [messages, setMessages] = useState([]);

    const [currLocation, setCurrLocation] = useState(SG_POSITION);
    const [mapOptions, setMapOptions] = useState(null);
    const [clusters, setClusters] = useState([]);

    useEffect(() => {
        const socket = io(SERVER_URL, {
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

        socket.on("outputUser", allUsers => {
            users.map((user) => console.log("user " + user.username + " joined"))
            setUsers({...users, allUsers});
        });

        socket.on("outputPosition", newUsers => {
            newUsers.map((user) =>
                console.log(
                    "user " + user.username + " moved to " + user.long + " " + user.lat
                )
            );
            const ids = new Set(newUsers.map(u => u.id));
            setUsers([...newUsers, ...users.filter(u => !ids.has(u.id))]);
        });

        socket.on("onlineUsers", (number) => {
            console.log("users: " + number);
            setNumOnline(number);
        });

        socket.on("userLeft", userId => {
            console.log("user " + userId + " left");
            setUsers([...users.filter(u => u.id !== userId)]);
        });

        socket.on("outputMessage", (messages) => {
            messages.map((message) => console.log(message.text));
            setMessages(messages);
        });

        // get location
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
                socket.emit("inputUser", {
                        username: username,
                        avatar: avatar,
                        ...location
                    }
                );
            })

            navigator.geolocation.watchPosition(position => {
                if (currLocation.lat !== position.coords.latitude || currLocation.lng !== position.coords.longitude) {
                    const location = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }

                    setCurrLocation(location);
                    console.log(location);
                    socket.emit("inputPosition", location);
                }
            })
        } else {
            console.log("Location disabled");
            socket.emit("inputUser", {
                    username: username,
                    avatar: avatar,
                    ...currLocation
                }
            );
        }

        socket.emit("inputMessage", {
            text: "Hello everybody, I'm " + username,
        });

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

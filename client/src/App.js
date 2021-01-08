import logo from "./HelloWorldLogo.svg";
import "./App.css";
import { io } from "socket.io-client";
const SERVER_URL = "http://localhost:5000";

function App() {
  // Socket.io connections between client and server
  const socket = io(SERVER_URL, {
    withCredentials: true,
    extraHeaders: {
      "my-custom-header": "abcd",
    },
  });

  socket.on("connected", (message) => {
    console.log(message);
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <br />
        <p>
          <strong> Welcome to HelloWorld </strong>
        </p>
        <p>
          <strong> The world's most engaging map </strong>
        </p>
      </header>
    </div>
  );
}

export default App;

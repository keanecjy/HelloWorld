import logo from "./HelloWorldLogo.svg";
import "./App.css";

function App() {
  // const socket = io("http://localhost:5000", {
  //     withCredentials: true,
  //     extraHeaders: {
  //       "my-custom-header": "abcd",
  //     },
  //   });

  // socket.emit("input", { username: "Frank", text: "Hello!" });

  // socket.emit("input", { username: "Dhafin", text: "Hello to you too!" });

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

import logo from "./HelloWorldLogo.svg";
import "./App.css";

function App() {
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

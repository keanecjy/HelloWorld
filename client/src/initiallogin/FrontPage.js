import React from 'react';
import logo from '../HelloWorldLogo.svg';
import './styles.css';

const FrontPage = ({ setScreen }) => {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>Welcome to HelloWorld</h1>
      <p> The world's most engaging map</p>
      <button
        onClick={() => {
          setScreen(false);
        }}
      >
        Get Started!
      </button>
    </header>
  );
};

export default FrontPage;

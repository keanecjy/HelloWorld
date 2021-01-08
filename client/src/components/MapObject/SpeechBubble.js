import React from 'react';
import './SpeechBubble.css';

function SpeechBubble({ children }) {
  return <div className={'speech-bubble'}>{children}</div>;
}

export default SpeechBubble;

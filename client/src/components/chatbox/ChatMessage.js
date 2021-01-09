import React, { useContext, useEffect, useState } from 'react';
import { StateContext } from '../../App';

function ChatMessage({ sender, text, senderId }) {
  const { socketId } = useContext(StateContext);
  const [isUserMessage, toggleUserMessage] = useState(false);

  useEffect(() => {
    toggleUserMessage(socketId === senderId);
  }, []);

  return (
    <div className={'chat-message'}>
      <div className={'chat-name'} style={{ float: isUserMessage ? 'right' : 'left' }}>
        {sender}
      </div>
      <div
        className={'chat-bubble'}
        style={isUserMessage ? { float: 'right', backgroundColor: '#3AD064' } : { float: 'left' }}
      >
        {text}
      </div>
    </div>
  );
}

export default ChatMessage;

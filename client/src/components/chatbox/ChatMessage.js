import React, { useState } from 'react';

function ChatMessage({ sender, text }) {
  const [isUserMessage, toggleUserMessage] = useState(false);

  return (
    <div className={'chat-message'}>
      <div className={'chat-name'} style={{ float: isUserMessage ? 'right' : 'left' }}>
        {sender}
      </div>
      <div className={'chat-bubble'} style={{ float: isUserMessage ? 'right' : 'left' }}>
        {text}
      </div>
    </div>
  );
}

export default ChatMessage;

import React, { useEffect, useState } from 'react';
import './styles.css';
import ChatTitle from './ChatTitle';
import MessageList from './MessageList';
import ChatInput from './ChatInput';

function scrollToBottom(id) {
  console.log('Scrolling');
  const div = document.getElementById(id);
  div.scrollTop = div.scrollHeight - div.clientHeight;
}

function ChatBox({ messages }) {
  const [isChatVisible, toggleChatVisibility] = useState(true);
  useEffect(() => {
    if (isChatVisible) {
      scrollToBottom('messages');
    }
  }, [messages, isChatVisible]);

  return (
    <div className={'column-flex'}>
      <ChatTitle onMinimise={toggleChatVisibility} />
      {isChatVisible && (
        <div className={'chat-body'} id={'messages'}>
          <MessageList messages={messages} />
        </div>
      )}
      <ChatInput />
    </div>
  );
}

export default ChatBox;

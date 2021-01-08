import React, { useContext, useEffect, useState } from 'react';
import { StateContext } from '../../App';
import { Modal } from 'react-bootstrap';
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
    if (isChatVisible) scrollToBottom('messages');
  }, []);

  return (
    <div className={'column-flex'}>
      <ChatTitle onMinimise={toggleChatVisibility}/>
      {isChatVisible && (
        <div className={'chat-body'} id={'messages'}>
          <MessageList />
        </div>
      )}
      <ChatInput />
    </div>
  );
}

export default ChatBox;

import React from 'react';
import ChatMessage from './ChatMessage';

const FAKE_MESSAGES = [...Array(120)].fill(0).map((value, index) => {
  return {
    sender: 'User' + index,
    text: 'Hello Hello Hello vHello HelloHelloHello',
  };
});

function trimMessages(messages) {
  return messages.slice(Math.max(messages.length - 100, 0));
}

function MessageList({ messages }) {
  return (
    <ul className={'message-list'}>
      {trimMessages(messages || FAKE_MESSAGES).map((message) => {
        return (
          <li>
            <ChatMessage sender={message.sender} text={message.text} />
          </li>
        );
      })}
    </ul>
  );
}

export default MessageList;

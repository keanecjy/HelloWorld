import React from 'react';
import ChatMessage from './ChatMessage';

// const FAKE_MESSAGES = [...Array(120)].fill(0).map((value, index) => {
//   return {
//     sender: 'User' + index,
//     text: 'Hello Hello Hello vHello HelloHelloHello',
//   };
// });

function trimMessages(messages) {
  return messages;
}

function MessageList({ messages }) {
  return (
    <ul className={'message-list'}>
      {trimMessages(messages || []).map((message, index) => {
        return (
          <li key={index}>
            <ChatMessage sender={message.sender} text={message.text} senderId={message.senderId} />
          </li>
        );
      })}
    </ul>
  );
}

export default MessageList;

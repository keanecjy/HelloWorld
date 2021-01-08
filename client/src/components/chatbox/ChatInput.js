import React, { useContext, useState } from 'react';
import { StateContext } from '../../App';

function ChatInput() {
  const { sendMessage } = useContext(StateContext);
  const [message, setMessage] = useState('');

  return (
    <form
      // onSubmit={(e) => {
      //   e.preventDefault();
      //   console.log('message value is ' + message);
      //   sendMessage(message);
      //   setMessage('');
      // }}
      className={'chat-form'}
    >
      <input
        className={'chat-form-input'}
        onChange={(e) => {
          // console.log(e.target.value);
          setMessage(e.target.value);
        }}
        value={message}
        placeholder={'Type a message...'}
        type={'text'}
      />
      <button
        className={'chat-send-button'}
        onClick={(e) => {
          e.preventDefault();
          // console.log('message value is ' + message);
          sendMessage(message);
          setMessage('');
        }}
      >
        Send
      </button>
    </form>
  );
}

export default ChatInput;

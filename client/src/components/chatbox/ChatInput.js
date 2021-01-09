import React, { useContext, useState } from 'react';
import { StateContext } from '../../App';

function ChatInput() {
  const { sendMessage } = useContext(StateContext);
  const [message, setMessage] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage(message);
        setMessage('');
      }}
      className={'chat-form'}
    >
      <input
        className={'chat-form-input'}
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        placeholder={'Type a message...'}
        type={'text'}
      />
      <button className={'chat-send-button'} type={'submit'}>
        Send
      </button>
    </form>
  );
}

export default ChatInput;

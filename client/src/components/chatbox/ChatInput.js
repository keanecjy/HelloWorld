import React, { useContext, useState } from 'react';
import { StateContext } from '../../App';
import { IoMdSend } from 'react-icons/all';

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
      <div className="standard-row">
        <input
          className={'chat-form-input'}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder={'Type a message...'}
          type={'text'}
        />
        <IoMdSend color={'#40A7E3'} size={'1.4em'} type={'submit'} />
      </div>
    </form>
  );
}

export default ChatInput;

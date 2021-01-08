import React from 'react';
import './UserPin.css';
import SpeechBubble from './SpeechBubble';
import UserAvatar from "../UserAvatar";

function UserPin({ details }) {
  const { chatMessage, image, name } = details;
  return (
    <div className={'user'}>
      {chatMessage && <SpeechBubble>{chatMessage}</SpeechBubble>}
      <div>
        <UserAvatar
          imgName={image}
          style={{
            width: "48px",
            height: "48px",
            color: "#fff",
            border: "2px solid #fff",
            borderRadius: "50%",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          // handleClick={() => handleSelection(key)}
        />
      </div>
      <p className={'user-name'}>{name || 'No Name'}</p>
    </div>
  );
}

export default UserPin;

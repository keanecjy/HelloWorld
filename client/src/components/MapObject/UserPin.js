import React from 'react';
import './UserPin.css';
import SpeechBubble from './SpeechBubble';
import UserAvatar from '../UserAvatar';

function UserPin({ username, avatar, message }) {
  return (
    <div className={'user'}>
      {message && <SpeechBubble>{message}</SpeechBubble>}
      <div>
        <UserAvatar
          avatar={avatar}
          style={{
            width: '48px',
            height: '48px',
            color: '#fff',
            border: '2px solid #fff',
            borderRadius: '50%',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>
      <p className={'user-name'}>{username || 'unnamed'}</p>
    </div>
  );
}

export default UserPin;

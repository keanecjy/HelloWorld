import React from 'react';
import { listOfImages } from './picturecontainer/imagesList';
import boy1 from './images/boy1.svg';

function UserAvatar({ handleClick, avatar, style }) {
  return (
    <>
      <img src={listOfImages[avatar]} alt={boy1} onClick={handleClick} style={style} />
    </>
  );
}

export default UserAvatar;

import React from 'react';
import { listOfImages } from './picturecontainer/imagesList';
import boy1 from './images/boy1.svg';

function UserAvatar({ handleClick, imgName, style }) {
  return (
    <>
      <img src={listOfImages[imgName]} alt={boy1} onClick={handleClick} style={style} />
    </>
  );
}

export default UserAvatar;

import React from 'react';
import { listOfImages } from './imagesList';
import { avatarList } from "../images";

const ListOfImages = ({ currentSelected, handleSelection }) => {
  return (
    <div className="grid-container">
      {Object.entries(listOfImages).map(([key, value]) => (
        <img
          src={value}
          key={key}
          alt="none"
          className="image-style"
          style={{
            boxShadow: currentSelected === key && '0 0 0 1pt #163CC5',
          }}
          onClick={() => handleSelection(key)}
        />
      ))}
    </div>
  );
};

export default ListOfImages;

import React from 'react';

const ListOfImages = ({ listOfImages, handleSelection }) => {
  return (
    <div>
      {listOfImages.map((x) => (
        <img src={x} alt="none" className="image-style" onClick={() => handleSelection(x)} />
      ))}
    </div>
  );
};

export default ListOfImages;

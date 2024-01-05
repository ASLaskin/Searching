import React from 'react';

const Tile = ({ pointA, pointB, isBarrier, onClick }) => {
  const tileStyle = {
    backgroundColor: isBarrier ? 'black' : pointA ? 'green' : pointB ? 'red' : 'white',
    color: 'white'
  };

  return (
    <div
      className="border-black border-2 h-10 w-10 flex items-center justify-center "
      style={tileStyle}
      onClick={onClick}
    >
      {pointA && 'A'}
      {pointB && 'B'}
    </div>
  );
};

export default Tile;

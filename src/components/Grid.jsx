import React, { useState } from 'react';
import Tile from './Tile';

const Grid = ({ rows, cols }) => {
  const [APointActive, setAPointActive] = useState(false);
  const [BPointActive, setBPointActive] = useState(false);
  const [barrierActive, setBarrierActive] = useState(false);

  const initialGrid = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({ row: 0, col: 0, isBarrier: false, pointA: false, pointB: false }))
  );

  const [grid, setGrid] = useState(initialGrid);

  const handleCellClick = (row, col) => {
    console.log(`Clicked on cell (${row}, ${col})`);
    const newGrid = [...grid];
    if (APointActive) {
      newGrid[row][col].pointA = true;
      setAPointActive(false);
    } else if (BPointActive) {
      newGrid[row][col].pointB = true;
      setBPointActive(false);
    } else if (barrierActive) {
      newGrid[row][col].isBarrier = true;
    }
    setGrid(newGrid);
  };

  const updatedGrid = [...grid];

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className="grid grid-cols-10">
        {updatedGrid.map((row, rowIndex) => (
          <div key={rowIndex} >
            {row.map((cell, colIndex) => (
              <Tile
                key={`${rowIndex}-${colIndex}`}
                pointA={cell.pointA}
                pointB={cell.pointB}
                isBarrier={cell.isBarrier}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center pt-20 gap-8">
        <button className="bg-green-500 text-white font-bold py-2 px-4 " onClick={() => setAPointActive(true)}>Set A</button>
        <button className="bg-red-500 text-white font-bold py-2 px-4 " onClick={() => setBPointActive(true)}>Set B</button>
        <button className="bg-black text-white font-bold py-2 px-4 " onClick={() => setBarrierActive(true)}>Set Barrier</button>
      </div>
    </div>
  );
};

export default Grid;

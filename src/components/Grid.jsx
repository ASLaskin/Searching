// Grid.jsx
import React, { useState } from 'react';
import Tile from './Tile';

const Grid = ({ rows, cols }) => {
  const [APointActive, setAPointActive] = useState(false);
  const [BPointActive, setBPointActive] = useState(false);
  const [setBarrierButton, setSetBarrierButton] = useState(false);

  const initialGrid = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({ row: 0, col: 0, isBarrier: false, pointA: false, pointB: false }))
  );

  const [grid, setGrid] = useState(initialGrid);

  const handleCellClick = (row, col) => {
    console.log(`Clicked on cell (${row}, ${col})`);
    const newGrid = [...grid];

    if (APointActive) {
      for (let i = 0; i < newGrid.length; i++) {
        for (let j = 0; j < newGrid[i].length; j++) {
          newGrid[i][j].pointA = false;
        }
      }
      setAPointActive(false);
    }

    if (BPointActive) {
      for (let i = 0; i < newGrid.length; i++) {
        for (let j = 0; j < newGrid[i].length; j++) {
          newGrid[i][j].pointB = false;
        }
      }
      setBPointActive(false);
    }

    if (APointActive) {
      newGrid[row][col].pointB = false;
      newGrid[row][col].isBarrier = false;
      newGrid[row][col].pointA = true;
    } else if (BPointActive) {
      newGrid[row][col].pointA = false;
      newGrid[row][col].isBarrier = false;
      newGrid[row][col].pointB = true;
    } else if (setBarrierButton) {
      newGrid[row][col].pointA = false;
      newGrid[row][col].pointB = false;
      newGrid[row][col].isBarrier = true;
    }

    console.log('Tile attributes:', newGrid[row][col]);
    setGrid(newGrid);
  };

  const clearGrid = () => {
    setGrid(initialGrid);
    setAPointActive(false);
    setBPointActive(false);
    setSetBarrierButton(false);
  };

  const updatedGrid = [...grid];

  return (
    <div className='flex flex-col justify-center items-center pt-10'>
      <div className="grid grid-cols-10">
        {updatedGrid.map((row, rowIndex) => (
          <div key={rowIndex}>
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
      <div className="flex justify-center items-center pt-10 gap-8">
        <button
          className={`bg-green-500 text-white font-bold py-2 px-4 ${APointActive && !setBarrierButton && 'opacity-50'}`}
          onClick={() => setAPointActive(!APointActive)}
          disabled={setBarrierButton}
        >
          Set A
        </button>
        <button
          className={`bg-red-500 text-white font-bold py-2 px-4 ${BPointActive && !setBarrierButton && 'opacity-50'}`}
          onClick={() => setBPointActive(!BPointActive)}
          disabled={setBarrierButton}
        >
          Set B
        </button>
        <button
          className={`bg-black text-white font-bold py-2 px-4`}
          onClick={() => setSetBarrierButton(!setBarrierButton)}
        >
          Set Barrier
        </button>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4"
          onClick={clearGrid}
        >
          Clear
        </button>
      </div>
      {setBarrierButton && <h1>Barrier Mode is ON (click again to set other points)</h1>}
    </div>
  );
};

export default Grid;

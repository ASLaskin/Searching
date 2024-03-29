import { useState } from 'react';
import Tile from './Tile';
import bfs from '../algorithms/BFS';

const Grid = ({ rows, cols }) => {
  const [APointActive, setAPointActive] = useState(false);
  const [BPointActive, setBPointActive] = useState(false);
  const [setBarrierButton, setSetBarrierButton] = useState(false);
  const [path, setPath] = useState([]);
  const [bfsDone, setBfsDone] = useState(false);


  const initialGrid = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      row: 0,
      col: 0,
      isBarrier: false,
      pointA: false,
      pointB: false,
    })),
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
    setBfsDone(false);
  };

  const runBFS = async () => {
    setPath([]);
    setBfsDone(false);
  
    // Reset the 'visited' attribute for all cells
    setGrid((prevGrid) => {
      const resetVisitedGrid = prevGrid.map((row) =>
        row.map((cell) => ({
          ...cell,
          visited: false,
        }))
      );
      return resetVisitedGrid;
    });
  
    const startPoint = findPoint(grid, 'pointA');
    const endPoint = findPoint(grid, 'pointB');
  
    if (startPoint && endPoint) {
      const { path, visitedCells } = bfs(grid, startPoint, endPoint);
      setPath(path);
  
      for (let i = 0; i < visitedCells.length; i++) {
        const { row, col } = visitedCells[i];
  
        setGrid((prevGrid) => {
          const updatedGrid = [...prevGrid];
          updatedGrid[row][col].visited = true;
          return updatedGrid;
        });
  
        // Add a delay (e.g., 100 milliseconds) to visualize the process
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }
    setBfsDone(true);
  };

  const findPoint = (grid, pointType) => {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j][pointType]) {
          return { row: i, col: j };
        }
      }
    }
    return null;
  };

  const randomizeGrid = () => {
    clearGrid();
    const numBarriers = Math.floor(Math.random() * (25-15) + 15);
    const availableCells = [];
  
    // Initialize available cells without barriers, pointA, and pointB
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (!grid[i][j].isBarrier && !grid[i][j].pointA && !grid[i][j].pointB) {
          availableCells.push({ row: i, col: j });
        }
      }
    }
  
    // Randomly place barriers
    for (let i = 0; i < numBarriers && availableCells.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * availableCells.length);
      const { row, col } = availableCells[randomIndex];
      setGrid((prevGrid) => {
        const updatedGrid = [...prevGrid];
        updatedGrid[row][col].isBarrier = true;
        return updatedGrid;
      });
      availableCells.splice(randomIndex, 1); // Remove the cell from available cells
    }
  
    // Randomly place points A and B if there are available cells
    if (availableCells.length > 1) {
      const randomizePoint = (pointType) => {
        const randomIndex = Math.floor(Math.random() * availableCells.length);
        const { row, col } = availableCells[randomIndex];
        setGrid((prevGrid) => {
          const updatedGrid = [...prevGrid];
          updatedGrid[row][col][pointType] = true;
          return updatedGrid;
        });
        availableCells.splice(randomIndex, 1); // Remove the cell from available cells
      };
  
      randomizePoint('pointA');
      randomizePoint('pointB');
    }
  };

  const updatedGrid = [...grid];

  return (
    <div className='flex flex-col justify-center items-center pt-10'>
      <div className='flex justify-center items-center pb-4'>
        <button
          className='bg-blue-500 text-white font-bold py-2 px-4'
          onClick={runBFS}
          disabled={setBarrierButton || !(findPoint(grid, 'pointA') && findPoint(grid, 'pointB'))}
        >
          Run BFS
        </button>
      </div>
      {setBarrierButton && <h1>Barrier Mode is ON (click again to set other points)</h1>}
      <div className='grid grid-cols-10'>
        {updatedGrid.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((cell, colIndex) => (
              <Tile
                key={`${rowIndex}-${colIndex}`}
                pointA={cell.pointA}
                pointB={cell.pointB}
                isBarrier={cell.isBarrier}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                visited={cell.visited}
                path={path.some(p => p.row === rowIndex && p.col === colIndex)}
                bfsDone={bfsDone}
              />
            ))}
          </div>
        ))}
      </div>
      <div className='flex justify-center items-center pt-10 gap-8'>
        <button
          className={`bg-green-500 text-white font-bold py-2 px-4 ${
            APointActive && !setBarrierButton && 'opacity-50'
          }`}
          onClick={() => setAPointActive(!APointActive)}
          disabled={setBarrierButton}
        >
          Set A
        </button>
        <button
          className={`bg-red-500 text-white font-bold py-2 px-4 ${
            BPointActive && !setBarrierButton && 'opacity-50'
          }`}
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
        <button className='bg-blue-500 text-white font-bold py-2 px-4' onClick={clearGrid}>
          Clear
        </button>
        <button className='bg-blue-500 text-white font-bold py-2 px-4' onClick={randomizeGrid}>
          Randomize
        </button>
      </div>
      {bfsDone && (
        <div>
          <h2>Path found:</h2>
          {path.map((point, index) => (
            <span key={index}>
              ({point.row}, {point.col}){index < path.length - 1 ? ' -> ' : ''}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Grid;

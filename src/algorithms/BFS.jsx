const getNeighbors = (grid, row, col) => {
  const neighbors = [];
  const numRows = grid.length;
  const numCols = grid[0].length;

  // Check neighbor logic
  if (row > 0 && !grid[row - 1][col].isBarrier) {
    neighbors.push({ row: row - 1, col });
  }
  if (row < numRows - 1 && !grid[row + 1][col].isBarrier) {
    neighbors.push({ row: row + 1, col });
  }
  if (col > 0 && !grid[row][col - 1].isBarrier) {
    neighbors.push({ row, col: col - 1 });
  }
  if (col < numCols - 1 && !grid[row][col + 1].isBarrier) {
    neighbors.push({ row, col: col + 1 });
  }
  return neighbors;
};

const getPath = (cameFrom, start, end) => {
  const path = [];
  let current = end;

  while (current !== start) {
    path.unshift(current);
    current = cameFrom[current.row][current.col];
  }

  path.unshift(start);
  return path;
};

const bfs = (grid, start, end) => {
  const queue = [];
  const visited = Array.from({ length: grid.length }, () =>
    Array.from({ length: grid[0].length }, () => false),
  );
  const cameFrom = Array.from({ length: grid.length }, () =>
    Array.from({ length: grid[0].length }, () => null),
  );

  const visitedCells = [];

  queue.push(start);
  visited[start.row][start.col] = true;

  while (queue.length > 0) {
    const current = queue.shift();

    //Reached the target
    if (current.row === end.row && current.col === end.col) {
      return { path: getPath(cameFrom, start, end), visitedCells };
    }

    const neighbors = getNeighbors(grid, current.row, current.col);

    for (const neighbor of neighbors) {
      if (!visited[neighbor.row][neighbor.col]) {
        queue.push(neighbor);
        visited[neighbor.row][neighbor.col] = true;
        cameFrom[neighbor.row][neighbor.col] = current;
        visitedCells.push({ row: neighbor.row, col: neighbor.col });
      }
    }
  }

  //No path found
  return { path: [], visitedCells };
};

export default bfs;

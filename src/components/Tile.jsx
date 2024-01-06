const Tile = ({ pointA, pointB, isBarrier, visited, onClick, path, bfsDone }) => {
  const baseClass = "border-black border-2 h-10 w-10 flex items-center justify-center";

  let backgroundColorClass = "bg-white";

  if (isBarrier) {
    backgroundColorClass = "bg-black";
  } else if (pointA) {
    backgroundColorClass = "bg-green-500";
  } else if (pointB) {
    backgroundColorClass = "bg-red-500";
  } else if (visited) {
    backgroundColorClass = "bg-yellow-500";
  }
  
  if (bfsDone && path) {
    backgroundColorClass = "bg-purple-500";
  }

  return (
    <div
      className={`${baseClass} ${backgroundColorClass}`}
      onClick={onClick}
    >
      {pointA && 'A'}
      {pointB && 'B'}
    </div>
  );
};

export default Tile;

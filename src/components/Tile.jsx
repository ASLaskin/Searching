const Tile = ({ pointA, pointB, isBarrier, visited, onClick }) => {
  return (
    <div
      className={`border-black border-2 h-10 w-10 flex items-center justify-center 
                  ${isBarrier ? 'bg-black' : 'bg-white'}
                  ${pointA ? 'bg-green-500' : ''}
                  ${pointB ? 'bg-red-500' : ''}
                  ${visited ? 'bg-yellow-500' : ''}`}
      onClick={onClick}
    >
      {pointA && 'A'}
      {pointB && 'B'}
    </div>
  );
};

export default Tile;

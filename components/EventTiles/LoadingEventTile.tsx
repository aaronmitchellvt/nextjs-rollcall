export interface LoadingEventTileProps {}

const LoadingEventTile: React.FC<LoadingEventTileProps> = () => {
  return (
    <div className="animate-pulse bg-gray-300 shadow-md w-full aspect-square p-3 m-2 rounded flex flex-col items-center justify-center text-center">
      <div className="animate-pulse bg-gray-500 rounded w-3/5"></div>
      <div className="animate-pulse bg-gray-500 rounded w-2/5"></div>
      <div className="animate-pulse bg-gray-500 rounded w-2/5"></div>
    </div>
  );
};

export default LoadingEventTile;

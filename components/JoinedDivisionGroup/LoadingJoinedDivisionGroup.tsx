import LoadingJoinedPlayer from "../JoinedPlayer/LoadingJoinedPlayer";

export interface LoadingJoinedDivisionGroupProps {
  division: string
}

const LoadingJoinedDivisionGroup: React.FC<LoadingJoinedDivisionGroupProps> = ({ division }) => {
  return (
    <div className="rounded border-2 border-black flex flex-col w-5/6 h-80 overflow-y-scroll bg-gray-100">
      <div className="bg-black text-center p-1">
        <h1 className="text-xl font-semibold text-white w-full">
          Division: {division}
        </h1>
      </div>
      <div className="p-2 flex flex-col items-center">
        <LoadingJoinedPlayer />
        <LoadingJoinedPlayer />
        <LoadingJoinedPlayer />
        <LoadingJoinedPlayer />
        <LoadingJoinedPlayer />
        <LoadingJoinedPlayer />
        <LoadingJoinedPlayer />
        <LoadingJoinedPlayer />
      </div>
    </div>
  );
};

export default LoadingJoinedDivisionGroup;

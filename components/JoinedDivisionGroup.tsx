import { JoinedPlayerProps } from "./JoinedPlayer";

export interface JoinedDivisionGroupProps {
  division: number;
  players: JSX.Element[];
}

const JoinedDivisionGroup: React.FC<JoinedDivisionGroupProps> = ({
  division,
  players,
}) => {
  return (
    <div className="rounded border-2 border-black flex flex-col w-5/6 h-80 overflow-y-scroll">
      <div className="bg-black text-center p-1">
        <h1 className="text-xl font-semibold text-white w-full">
          Division: {String(division)}
        </h1>
      </div>
      <div className="p-2 flex flex-col items-center">{players}</div>
    </div>
  );
};

export default JoinedDivisionGroup;

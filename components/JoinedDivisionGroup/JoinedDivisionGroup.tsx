import JoinedPlayer from "../JoinedPlayer/JoinedPlayer";

export interface JoinedDivisionGroupProps {
  division: number;
  players?: Array<any>;
}

const JoinedDivisionGroup: React.FC<JoinedDivisionGroupProps> = ({
  division,
  players,
}) => {

  const playerTiles = players?.map((player) => {
    return <JoinedPlayer name={player.user_name} isIn={player.isIn} key={player.user_name} />;
  })

  return (
    <>
      {players && (
        <div className="rounded border-2 border-black flex flex-col w-5/6 h-80 overflow-y-scroll mt-4 sm:mt-0">
          <div className="bg-black text-center p-1 fix">
            <h1 className="text-xl font-semibold text-white w-full">
              Division: {String(division)}
            </h1>
          </div>
          <div className="p-2 flex flex-col items-center bg-gray-100">
            {players && playerTiles}
          </div>
        </div>
      )}
    </>
  );
};

export default JoinedDivisionGroup;

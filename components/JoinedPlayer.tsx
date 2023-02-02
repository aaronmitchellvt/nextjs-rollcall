
export interface JoinedPlayerProps {
  name: string;
}

const JoinedPlayer: React.FC<JoinedPlayerProps> = ({ name }) => {
  return (
    <div className="w-full rounded bg-gray-300 m-2 text-center font-bold p-2">
      <p className="text-lg">{name}</p>
    </div>
  );
};

export default JoinedPlayer;
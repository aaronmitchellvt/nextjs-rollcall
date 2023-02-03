
export interface JoinedPlayerProps {
  name: string;
  isIn: boolean
}

const JoinedPlayer: React.FC<JoinedPlayerProps> = ({ name, isIn }) => {
  const bgColor = isIn ? "bg-green-300" : "bg-red-300"
  return (
    <div className={`${bgColor} w-full rounded m-2 text-center font-bold p-2`}>
      <p className="text-lg">{name}</p>
    </div>
  );
};

export default JoinedPlayer;
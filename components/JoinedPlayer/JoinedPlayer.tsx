import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
export interface JoinedPlayerProps {
  name: string;
  isIn: boolean;
}

const JoinedPlayer: React.FC<JoinedPlayerProps> = ({ name, isIn }) => {
  const bgColor = isIn ? "bg-green-300" : "bg-red-300";
  return (
    <div className={`${bgColor} w-full rounded m-2 text-center font-bold p-2 flex flex-row justify-between items-center px-6`}>
      <p className="text-lg">{name}</p>

      {isIn ? (
        <FontAwesomeIcon
          icon={faCheck}
          style={{ fontSize: 20, color: "green" }}
        />
      ) : (
        <FontAwesomeIcon
          icon={faXmark}
          style={{ fontSize: 20, color: "red" }}
        />
      )}
    </div>
  );
};

export default JoinedPlayer;

import Link from "next/link";

export interface EventTileProps {
  id: number;
  title: string;
  date: string;
}

const EventTile: React.FC<EventTileProps> = ({ title, date, id }) => {
  return (
    <div className="hover:shadow-2xl w-full aspect-square p-3 m-2 bg-black rounded flex flex-col items-center justify-center text-center">
      <h1 className="text-2xl font-semibold text-white">{title}</h1>
      <h3 className="text-lg font-semibold text-white">{date}</h3>
      <Link href={`/events/${id}`} >
        <button className="text-white rounded border-2 border-white p-2 mt-2 hover:bg-white hover:text-black hover:font-semibold">
          More Info
        </button>
      </Link>
    </div>
  );
};

export default EventTile;

import supabase from "@/lib/supabase";
import { useQuery } from "react-query";
import EventTile from "./EventTiles/EventTile";
import LoadingEventTile from "./EventTiles/LoadingEventTile";

export interface EventListProps {}

const EventList: React.FC<EventListProps> = () => {
  //Get the list of events from table
  const fetchEvents = async () => {
    const { data } = await supabase.from("Events").select("*");
    return data;
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["events"],
    queryFn: () => fetchEvents(),
  });

  if (isError) {
    return <h1>Uh oh, there was en error getting events..</h1>;
  }

  if (isLoading) {
    return (
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center gap-4 mx-2">
        <LoadingEventTile />
        <LoadingEventTile />
        <LoadingEventTile />
      </div>
    );
  }

  const events = data?.map((event) => {
    return <EventTile title={event.title} date={event.date} id={event.id} />;
  });

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center gap-4 mx-2">
      {events}
    </div>
  );
};

export default EventList;

import { fetchEvents } from "@/services/eventServices";
import { useQuery } from "react-query";
import EventTile from "./EventTiles/EventTile";
import LoadingEventTile from "./EventTiles/LoadingEventTile";
import FetchedData from "./FetchedData";

const EventList: React.FC<EventListProps> = () => {

  const { data, isLoading, isError } = useQuery({
    queryKey: ["events"],
    queryFn: () => fetchEvents(),
  });

  const events = data?.map((event) => {
    return (
      <EventTile
        title={event.title}
        date={event.date}
        id={event.id}
        key={event.id}
      />
    );
  });

  return (
    <FetchedData
      isQueryingData={isLoading}
      isError={isError}
      isValidData={true}
      childrenQueryingData={
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center gap-4">
          <LoadingEventTile />
          <LoadingEventTile />
          <LoadingEventTile />
        </div>
      }
      childrenError={
        <>
          <h1>Uh oh, there was en error getting events..</h1>
        </>
      }
      childrenInvalidData={<></>}
      childrenValidData={
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center gap-4">
          {events}
        </div>
      }
    ></FetchedData>
  );
};

export default EventList;

export interface EventListProps {}


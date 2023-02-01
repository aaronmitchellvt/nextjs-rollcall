import PrimaryLayout from "@/components/layout/PrimaryLayout";
import supabase from "@/lib/supabase";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { NextPageWithLayout } from "../page";

export interface EventDetailsProps {}

const EventDetails: NextPageWithLayout<EventDetailsProps> = () => {
  const router = useRouter();
  const eventId = router.query.eventId;

  //Fetch event details
  const fetchEventDetails = async () => {
    let { data, error } = await supabase
      .from("Events")
      .select("*")
      .eq("id", String(eventId));
    return data;
  };
  const {
    isError: eventError,
    isLoading: eventLoading,
    data: eventData,
  } = useQuery({
    queryKey: ["eventDetails"],
    queryFn: () => fetchEventDetails(),
  });

  const fetchEventPlayers = async () => {
    let { data, error } = await supabase
      .from("Joined_Players")
      .select("*")
      .eq("event_id", String(eventId));
    return data;
  };
  const { isError, isLoading, data } = useQuery({
    queryKey: ["eventPlayers"],
    queryFn: () => fetchEventPlayers(),
  });

  console.log("response: ", data);

  if (eventError) {
    return <h1>Uh uh, there was an error getting event details.</h1>;
  }

  if (eventLoading) {
    return <h1>Fetching event details..</h1>;
  }

  return (
    <div className="bg-gray-200 h-screen flex flex-col items-center pt-3">
      <h1 className="text-2xl font-semibold">
        {eventData![0].title} on {eventData![0].date}
      </h1>
      <h2 className="text-xl">These players will be there</h2>
      <ul>
        {data?.map((user) => {
          return <li>id: {user.user_id}</li>
        })}
      </ul>
    </div>
  );
};

export default EventDetails;

EventDetails.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export interface eventDetails {
  title?: string;
  date?: string;
}

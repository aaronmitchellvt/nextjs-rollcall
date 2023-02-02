import JoinedDivisionGroup from "@/components/JoinedDivisionGroup";
import JoinedPlayer from "@/components/JoinedPlayer";
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

  //Add Event name and date
  //Add form, are you in (fontawesome check green bg) Or out (red ex)
  //Idea, green bg color if player is in, red if out,
  //add loading spinner when in or out is clicked while post being made

  return (
    <PrimaryLayout>
      <div className="bg-white h-screen flex flex-col items-center pt-3 w-full">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center gap-1 ml-12 mr-12">
        {divisionTwoGroup}
        {divisionThreeGroup}
        {divisionFourGroup}
        </div>
      </div>
    </PrimaryLayout>
  );
};

export default EventDetails;
export interface eventDetails {
  title?: string;
  date?: string;
}

const mockDivisionTwoPlayers = [
  <JoinedPlayer name="aaron mitchell" />,
  <JoinedPlayer name="aaron mitchell" />,
  <JoinedPlayer name="aaron mitchell" />,
  <JoinedPlayer name="aaron mitchell" />,
  <JoinedPlayer name="aaron mitchell" />,
  <JoinedPlayer name="aaron mitchell" />,
  <JoinedPlayer name="aaron mitchell" />,
  <JoinedPlayer name="aaron mitchell" />,
];

const divisionTwoGroup = (
  <JoinedDivisionGroup division={2} players={mockDivisionTwoPlayers} />
);

const divisionThreeGroup = (
  <JoinedDivisionGroup division={3} players={mockDivisionTwoPlayers} />
);

const divisionFourGroup = (
  <JoinedDivisionGroup division={4} players={mockDivisionTwoPlayers} />
);

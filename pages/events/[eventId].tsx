import FetchedData from "@/components/FetchedData";
import JoinedDivisionGroup from "@/components/JoinedDivisionGroup/JoinedDivisionGroup";
import LoadingJoinedDivisionGroup from "@/components/JoinedDivisionGroup/LoadingJoinedDivisionGroup";
import JoinEventForm from "@/components/JoinEventForm";
import PrimaryLayout from "@/components/layout/PrimaryLayout";
import { fetchEventDetails, fetchEventPlayers } from "@/services/eventServices";
import { useSession } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { NextPageWithLayout } from "../page";

export interface EventDetailsProps {}

const EventDetails: NextPageWithLayout<EventDetailsProps> = () => {
  const router = useRouter();
  const eventId = router.query.eventId;
  const session = useSession();

  const {
    isError: eventIsError,
    isLoading: eventIsLoading,
    data: eventData,
  } = useQuery({
    queryKey: ["eventDetails"],
    queryFn: () => fetchEventDetails(eventId),
    enabled: !!eventId,
  });

  const {
    isError: joinedPlayersIsError,
    isLoading: joinedPlayersIsLoading,
    data: joinedPlayersData,
  } = useQuery({
    queryKey: ["eventPlayers"],
    queryFn: () => fetchEventPlayers(eventId),
    enabled: !!eventId,
  });
  const divisionTwoPlayers = joinedPlayersData?.filter((player) => {
    return player.user_division === 2;
  });
  const divisionThreePlayers = joinedPlayersData?.filter((player) => {
    return player.user_division === 3;
  });
  const divisionFourPlayers = joinedPlayersData?.filter((player) => {
    return player.user_division === 4;
  });
  const divisionFivePlayers = joinedPlayersData?.filter((player) => {
    return player.user_division === 5;
  });

  return (
    <PrimaryLayout>
      <FetchedData
        isQueryingData={eventIsLoading || joinedPlayersIsLoading}
        isError={eventIsError || joinedPlayersIsError}
        isValidData={true}
        childrenQueryingData={
          <>
            <div className="w-full h-24 sm:h-16 bg-gradient-to-r from-red-500 to-red-800 text-white text-center p-2 text-3xl font-medium shadow">
              <div className="w-3/5 animate-pulse rounded bg-gray-200"></div>
            </div>
            <div className="bg-white h-screen flex flex-col items-center pt-3 w-full mt-2">
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center gap-1 ml-12 mr-12">
                <LoadingJoinedDivisionGroup division="2" />
                <LoadingJoinedDivisionGroup division="3" />
                <LoadingJoinedDivisionGroup division="4" />
                <LoadingJoinedDivisionGroup division="5" />
              </div>
            </div>
          </>
        }
        childrenError={
          <>
            <h1 className="text-xl">There was an error fetching event data</h1>
          </>
        }
        childrenInvalidData={
          <>
            <h1>Children invalid data</h1>
          </>
        }
        childrenValidData={
          <>
            <div className="w-full h-22 sm:h-16 bg-gradient-to-r from-red-500 to-red-800 text-white text-center p-2 text-3xl font-medium shadow">
              {eventData && eventData[0].title},{" "}
              {eventData && eventData[0].date}
            </div>
            {eventId !== undefined && <JoinEventForm eventId={eventId![0]} />}
            <div className="bg-white h-screen flex flex-col items-center pt-3 w-full">
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center gap-1 ml-12 mr-12 pb-2">
                <JoinedDivisionGroup
                  players={divisionTwoPlayers}
                  division={2}
                />
                <JoinedDivisionGroup
                  players={divisionThreePlayers}
                  division={3}
                />
                <JoinedDivisionGroup
                  players={divisionFourPlayers}
                  division={4}
                />
                <JoinedDivisionGroup
                  players={divisionFivePlayers}
                  division={5}
                />
              </div>
            </div>
          </>
        }
      ></FetchedData>
    </PrimaryLayout>
  );
};

export default EventDetails;
export interface eventDetails {
  title?: string;
  date?: string;
}

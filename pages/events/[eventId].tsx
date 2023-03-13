import FetchedData from "@/components/FetchedData";
import JoinedDivisionGroup from "@/components/JoinedDivisionGroup/JoinedDivisionGroup";
import LoadingJoinedDivisionGroup from "@/components/JoinedDivisionGroup/LoadingJoinedDivisionGroup";
import JoinEventForm from "@/components/JoinEventForm";
import PrimaryLayout from "@/components/layout/PrimaryLayout";
import supabase from "@/lib/supabase";
import { fetchEventDetails, fetchEventPlayers } from "@/services/eventServices";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { NextPageWithLayout } from "../page";

export interface EventDetailsProps {}

const EventDetails: NextPageWithLayout<EventDetailsProps> = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
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

  //join event form
  const [renderForm, setRenderForm] = useState<boolean>(true);
  const [userPayload, setUserPayload] = useState<IUserPayload>({
    name: "",
    division: 2,
  });
  const eventIdNum = Number(eventId);
  //User IS attending logic
  const onWillAttend = async () => {
    setRenderForm(false);
    const response = await supabase.from("Joined_Players").insert([
      {
        event_id: eventIdNum,
        isIn: true,
        user_name: userPayload.name,
        user_division: Number(userPayload.division),
      },
    ]);
    return response;
  };
  const attendingEventMutation = useMutation({
    mutationFn: () => onWillAttend(),
    onSuccess: () => {
      queryClient.invalidateQueries(["hasUserPosted"]);
      queryClient.refetchQueries(["eventPlayers"]);
    },
  });

  //User is NOT attending logic
  const onNotAttending = async () => {
    setRenderForm(false);
    const response = await supabase.from("Joined_Players").insert([
      {
        event_id: eventIdNum,
        isIn: false,
        user_name: userPayload.name,
        user_division: Number(userPayload.division),
      },
    ]);
    return response;
  };
  const notAttendingEventMutation = useMutation({
    mutationFn: () => onNotAttending(),
    onSuccess: () => {
      queryClient.invalidateQueries(["hasUserPosted"]);
      queryClient.refetchQueries(["eventPlayers"]);
    },
  });
  const postRequestIsLoading =
    attendingEventMutation.isLoading || notAttendingEventMutation.isLoading;
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
            {renderForm && eventId !== undefined && (
              <>
                <div className="flex flex-row p-2 ml-8 text-2xl items-center font-semibold">
                  <label className="text-xl font-semibold mr-3">Name</label>
                  <input
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setUserPayload({ ...userPayload, name: e.target.value })
                    }
                    className="border-2 rounded p-1 w-1/5"
                    value={userPayload.name}
                  />
                  <label className="text-xl font-semibold mx-3">Division</label>
                  <select
                    onChange={(e) =>
                      setUserPayload({
                        ...userPayload,
                        division: Number(e.target.value),
                      })
                    }
                    value={userPayload.division}
                    className="border-2 rounded p-1 mr-2"
                  >
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </select>
                  <h1 className="mr-1">Are you in?</h1>
                  <button
                    onClick={() => attendingEventMutation.mutate()}
                    className="p-1 hover:bg-green-300 h-10 w-10 rounded-lg"
                  >
                    <FontAwesomeIcon
                      icon={faCheck}
                      style={{ fontSize: 35, color: "green" }}
                    />
                  </button>

                  <h1 className="ml-1 mr-2">Or Out?</h1>
                  <button
                    onClick={() => notAttendingEventMutation.mutate()}
                    className="p-1 hover:bg-red-300 h-10 w-10 rounded-lg"
                  >
                    <FontAwesomeIcon
                      icon={faXmark}
                      style={{ fontSize: 35, color: "red" }}
                    />
                  </button>
                  {/* Show spinner when the request is being made */}
                  {postRequestIsLoading && (
                    <div className="ml-2 flex justify-center items-center">
                      <div
                        className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                        role="status"
                      ></div>
                    </div>
                  )}
                </div>{" "}
              </>
            )}
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

export interface IUserPayload {
  name: string;
  division: number;
}

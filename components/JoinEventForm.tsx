import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQuery } from "react-query";
import supabase from "@/lib/supabase";
import FetchedData from "./FetchedData";
import { useSession } from "@supabase/auth-helpers-react";

export interface JoinEventFormProps {
  eventId: string;
  userId: string;
}

const JoinEventForm: React.FC<JoinEventFormProps> = ({ eventId, userId }) => {
  const session = useSession();
  //check if the user has already posted
  const checkIfUserHasAlreadyPosted = async () => {
    const response = await supabase
      .from("Joined_Players")
      .select("*")
      .eq("user_id", userId)
      .eq("event_id", eventId);
    return response;
  };
  const {
    isLoading: initialCheckLoading,
    isError: initialCheckIsError,
    data: initialCheckData,
  } = useQuery({
    queryKey: ["hasUserPosted"],
    queryFn: () => checkIfUserHasAlreadyPosted(),
  });
  //want true for displaying form
  const initialCheckIsValidData = initialCheckData !== undefined && initialCheckData.data?.length !== 1;

  const getUserProfile = async() => {
    let { data } = await supabase
  .from('Player')
  .select('*').eq("id", userId);
  return data
  }

  const getPlayerProfileQuery = useQuery({
    queryKey: ["getPlayerProfile"],
    queryFn: () => getUserProfile(),
    enabled: !!session?.user.id
  })

  console.log("getPlayerProfileQuery data: ", getPlayerProfileQuery.data);

  const eventIdNum = Number(eventId);
  //User IS attending logic
  const onWillAttend = async () => {
    const response = await supabase.from("Joined_Players").insert([
      {
        event_id: eventIdNum,
        isIn: true,
        user_name: "Aaron",
        user_id: userId,
        user_division: getPlayerProfileQuery?.data![0].division
      },
    ]);
    return response;
  };
  const attendingEventMutation = useMutation({
    mutationFn: () => onWillAttend(),
  });

  //User is NOT attending logic
  const onNotAttending = async () => {
    const response = await supabase.from("Joined_Players").insert([
      {
        event_id: eventIdNum,
        isIn: false,
        user_name: "Aaron",
        user_id: userId,
        user_division: getPlayerProfileQuery?.data![0].division
      },
    ]);
    return response;
  };
  const notAttendingEventMutation = useMutation({
    mutationFn: () => onNotAttending(),
  });

  return (
    <FetchedData
      isQueryingData={initialCheckLoading}
      isError={initialCheckIsError}
      isValidData={initialCheckIsValidData}
      childrenQueryingData={<></>}
      childrenError={
        <>
          <h1 className="text-xl">There was an error displaying event form</h1>
        </>
      }
      childrenInvalidData={<></>}
      childrenValidData={
        <div className="flex flex-row p-2 ml-8 text-2xl items-center font-semibold">
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
        </div>
      }
    ></FetchedData>
  );
};

export default JoinEventForm;

// {!initialCheckLoading && initialCheckData?.data && initialCheckData.data.length === 0 && (

//   {attendingEventMutation.status === "loading" ||
//     (notAttendingEventMutation.status === "loading" && (
//       <>
//         <h1 className="text-xl">Posting..</h1>
//         <div className="flex justify-center items-center">
//           <div
//             className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
//             role="status"
//           >
//             <span className="visually-hidden">Loading...</span>
//           </div>
//         </div>
//       </>
//     ))}
// )}

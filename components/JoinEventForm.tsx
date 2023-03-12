import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQueryClient } from "react-query";
import supabase from "@/lib/supabase";
import { useState } from "react";

export interface JoinEventFormProps {
  eventId: string;
}

const JoinEventForm: React.FC<JoinEventFormProps> = ({ eventId }) => {
  const queryClient = useQueryClient();

  const [userPayload, setUserPayload] = useState<IUserPayload>({
    name: "",
    division: 2,
  });
  const eventIdNum = Number(eventId);
  //User IS attending logic
  const onWillAttend = async () => {
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
    </div>
  );
};

export default JoinEventForm;

export interface IUserPayload {
  name: string;
  division: number;
}

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

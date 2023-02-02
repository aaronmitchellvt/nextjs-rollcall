import PrimaryLayout from "@/components/layout/PrimaryLayout";
import supabase from "@/lib/supabase";
import { useSession } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { stringify } from "querystring";
import { useState } from "react";
import { useMutation } from "react-query";

export interface PlayerDetailsProps {}

const PlayerDetails: React.FC<PlayerDetailsProps> = () => {
  const session = useSession();
  const router = useRouter();

  const [userPayload, setUserPayload] = useState({
    name: "",
    division: 2,
  });

  const onSubmitPlayerDetails = async () => {
    const response = await supabase.from("Player").insert([
      {
        id: session?.user.id,
        name: userPayload.name,
        division: userPayload.division,
      },
    ]);
    return response;
  };

  const playerDetailsMutation = useMutation({
    mutationFn: () => onSubmitPlayerDetails(),
  });

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    playerDetailsMutation.mutate();
  };

  if (playerDetailsMutation.isError) {
    return (
      <h1 className="text-xl">
        Oop's there was an error saving your details. Try again later.
      </h1>
    );
  }

  if (playerDetailsMutation.isSuccess) {
    router.push("/");
  }

  return (
    <PrimaryLayout>
      <div className="flex flex-col items-center mt-4">
        <h1 className="text-3xl font-semibold">Enter player details</h1>
        <form
          className="bg-white w-full sm:w-2/3 md:w-1/3 h-auto rounded p-6"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <label className="text-xl font-semibold mt-3">
              Primary Division
            </label>
            <select
              onChange={(e) =>
                setUserPayload({ ...userPayload, division: Number(e.target.value) })
              }
              value={userPayload.division}
              className="border-2 rounded p-1"
            >
              <option value={2}>Division 2</option>
              <option value={3}>Division 3</option>
              <option value={4}>Division 4</option>
              <option value={5}>Division 5</option>
            </select>
            <label className="text-xl font-semibold mt-3">Name</label>
            <input
              onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserPayload({ ...userPayload, name: e.target.value })
              }
              className="border-2 rounded p-1"
              value={userPayload.name}
            />
            <button
              className="p-2 mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white rounded"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </PrimaryLayout>
  );
};

export default PlayerDetails;

import supabase from "@/lib/supabase";
import { checkPlayerDetails, fetchUser, onSubmitPlayerDetails } from "@/services/playerServices";
import { useSession } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import Head from "next/head";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import FetchedData from "../FetchedData";
import Footer from "./Footer";
import Navbar from "./Navbar";

export interface IPrimaryLayout {
  children: React.ReactNode
}

const PrimaryLayout: React.FC<IPrimaryLayout> = ({ children }) => {
  const session = useSession();
  const userId = session?.user.id;
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser(),
  });
  const isLoggedIn = data?.user !== null && !isLoading && !isError;


  const {
    isLoading: playDetailsIsLoading,
    isError: playerDetailsIsError,
    data: playerDetailsData,
  } = useQuery({
    queryKey: ["checkPlayerDetails"],
    queryFn: () => checkPlayerDetails(userId),
    enabled: !!session?.user.id,
  });
  const playerDetailsIsValidData =
    !playDetailsIsLoading &&
    !playerDetailsIsError &&
    playerDetailsData?.data !== null &&
    playerDetailsData?.data !== undefined &&
    playerDetailsData.data.length > 0;

  const [userPayload, setUserPayload] = useState<IUserPayload>({
    name: "",
    division: 2,
  });
  const playerDetailsMutation = useMutation({
    mutationFn: () => onSubmitPlayerDetails(userId, userPayload),
    onSuccess: () => {
      queryClient.refetchQueries(["checkPlayerDetails"]);
    },
  });

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    playerDetailsMutation.mutate();
  };

  return (
    <>
      <Head>
        <title>Rollcall</title>
      </Head>
      <FetchedData
        isQueryingData={isLoading}
        isError={isError}
        isValidData={isLoggedIn}
        childrenQueryingData={
          <>
            <Navbar />
            <main className="flex flex-col h-screen w-full justify-between overflow-y-scroll mb-3"></main>
            <Footer />
          </>
        }
        childrenError={
          <>
            <Navbar />
            <main className="flex flex-col h-screen w-full justify-between overflow-y-scroll">
              <h1 className="text-2xl text-center">
                Sorry, there has been an error on Aarons end..
              </h1>
            </main>
            <Footer />
          </>
        }
        childrenInvalidData={
          <>
            <Navbar />
            <main className="flex flex-col h-screen w-full justify-between items-center overflow-y-scroll mb-3">
              <div className="w-4/5 sm:w-2/3 lg:w-1/3 mx-8">
                <Auth
                  supabaseClient={supabase}
                  appearance={{
                    theme: ThemeSupa,
                    variables: {
                      default: {
                        colors: {
                          brand: "blue",
                          brandAccent: "darkblue",
                        },
                      },
                    },
                  }}
                />
              </div>
            </main>
            <Footer />
          </>
        }
        // The user is authenticated
        childrenValidData={
          <>
            <Navbar />
            <main className="flex flex-col h-screen w-full justify-between overflow-y-scroll">
              <FetchedData
                isQueryingData={playDetailsIsLoading}
                isError={playerDetailsIsError}
                isValidData={playerDetailsIsValidData}
                childrenQueryingData={<></>}
                childrenError={
                  <>
                    <h1 className="text-2xl text-center">
                      Aaron has messed something up, let him know pls
                    </h1>
                  </>
                }
                // The user is authenticated, but needs to provide player details
                childrenInvalidData={
                  <>
                    <div className="flex flex-col items-center mt-4">
                      <h1 className="text-3xl font-semibold">
                        Enter player details
                      </h1>
                      <form
                        className="bg-white w-full sm:w-2/3 md:w-1/3 h-auto rounded p-6"
                        onSubmit={handleSubmit}
                      >
                        <div className="flex flex-col">
                          <label className="text-xl font-semibold mt-3">
                            Name
                          </label>
                          <input
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                              setUserPayload({
                                ...userPayload,
                                name: e.target.value,
                              })
                            }
                            className="border-2 rounded p-1"
                            value={userPayload.name}
                          />
                          <label className="text-xl font-semibold mt-3">
                            Primary Division
                          </label>
                          <select
                            onChange={(e) =>
                              setUserPayload({
                                ...userPayload,
                                division: Number(e.target.value),
                              })
                            }
                            value={userPayload.division}
                            className="border-2 rounded p-1"
                          >
                            <option value={2}>Division 2</option>
                            <option value={3}>Division 3</option>
                            <option value={4}>Division 4</option>
                            <option value={5}>Division 5</option>
                          </select>
                          <button
                            className="p-2 mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white rounded"
                            type="submit"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                    {/* <PlayerDetailsForm /> */}
                  </>
                }
                // The user is authenticated and has provided player details
                childrenValidData={<>{children}</>}
              ></FetchedData>
            </main>
            <Footer />
          </>
        }
      ></FetchedData>
    </>
  );
};

export default PrimaryLayout;

export interface IUserPayload {
  name: string,
  division: number
}

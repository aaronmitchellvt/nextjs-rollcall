import supabase from "../lib/supabase";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import {
  useUser,
  useSupabaseClient,
  useSession,
} from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";

interface SignInOrCreateAccountProps {}

const SignInOrCreateAccount: React.FC<SignInOrCreateAccountProps> = () => {
  const session = useSession();

  const onCreateOrSignInAccount = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    console.log("*data: ", data);
    console.log("*error: ", error);
  };

  const [userPayload, setUserPayload] = useState({
    name: "",
    division: "",
    email: "",
    password: "",
  });
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const onCreateAccount = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log("userPayload: ", userPayload);
    setHasSubmitted(true);
    onUserSignUp();
  };



  const onUserSignUp = async() => {
    const response = await supabase.auth.signUp(
      {
        email: userPayload.email,
        password: userPayload.password,
      }
    )
    return response;
  }

  const postUserDetails = async() => {

  }

  const userSignUpMutation = useMutation({
    mutationFn: () => onUserSignUp(),
    onSuccess: () => {
      postUserDetails();
    }
  })
  
  

  return (
    <>
      {!hasSubmitted ? (
        <form
          className="bg-white w-full sm:w-2/3 md:w-1/3 h-auto rounded p-6"
          onSubmit={onCreateAccount}
        >
          <div className="flex flex-col">
            <label className="text-xl font-semibold mt-3">Email</label>
            <input
              onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserPayload({ ...userPayload, email: e.target.value })
              }
              className="border-2 rounded p-1"
              value={userPayload.email}
            />

            <label className="text-xl font-semibold mt-3">Password</label>
            <input
              type="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserPayload({ ...userPayload, password: e.target.value })
              }
              className="border-2 rounded p-1"
              value={userPayload.password}
            />

            <button
              className="p-2 mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white rounded"
              type="submit"
            >
              Create Account
            </button>
          </div>
        </form>
      ) : (
        <div className="text-xl font-semibold">
          Go check your email for a link
        </div>
      )}
    </>
  );

  // return (
  //   <div className="grid place-items-center mt-16 pt-8 px-3">
  //     <form
  //       className="bg-white w-full sm:w-2/3 md:w-1/3 h-auto rounded mt-8 p-6"
  //       onSubmit={onCreateOrSignInAccount}
  //     >
  //       <h1 className="text-black text-xl text-center font-bold pt-3">
  //         Create an account
  //       </h1>
  //       <button
  //         className="p-2 mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white rounded"
  //         type="submit"
  //       >
  //         <span className="flex justify-between items-center pr-3">
  //           <p className="pl-3">Contine with Facebook</p>
  //         </span>
  //       </button>
  //       <hr />
  //       <h1 className="text-black text-xl text-center font-bold pt-3">
  //         Sign In
  //       </h1>
  //       <button
  //         className="p-2 mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white rounded"
  //         type="submit"
  //       >
  //         <span className="flex justify-between items-center pr-3">
  //           <p className="pl-3">Contine with Facebook</p>
  //         </span>
  //       </button>
  //     </form>
  //   </div>
  // );
};

export default SignInOrCreateAccount;

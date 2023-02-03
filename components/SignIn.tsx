import supabase from "../lib/supabase";
import { useState } from "react";

interface SignInOrCreateAccountProps {}

const SignInOrCreateAccount: React.FC<SignInOrCreateAccountProps> = () => {
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

  const onUserSignUp = async () => {
    const response = await supabase.auth.signUp({
      email: userPayload.email,
      password: userPayload.password,
    });
    return response;
  };

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
};

export default SignInOrCreateAccount;

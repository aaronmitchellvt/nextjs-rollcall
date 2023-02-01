import supabase from "../lib/supabase";

interface SignInOrCreateAccountProps {}

const SignInOrCreateAccount: React.FC<SignInOrCreateAccountProps> = () => {

  const onCreateOrSignInAccount = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    })
    console.log("*data: ", data);
    console.log("*error: ", error);
  };

  return (
    <div className="grid place-items-center mt-16 pt-8 px-3">
      <form
        className="bg-white w-full sm:w-2/3 md:w-1/3 h-auto rounded mt-8 p-6"
        onSubmit={onCreateOrSignInAccount}
      >
        <h1 className="text-black text-xl text-center font-bold pt-3">
          Create an account
        </h1>
        <button
          className="p-2 mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white rounded"
          type="submit"
        >
          <span className="flex justify-between items-center pr-3">
            <p className="pl-3">Contine with Facebook</p>
          </span>
        </button>
        <hr />
        <h1 className="text-black text-xl text-center font-bold pt-3">
          Sign In
        </h1>
        <button
          className="p-2 mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white rounded"
          type="submit"
        >
          <span className="flex justify-between items-center pr-3">
            <p className="pl-3">Contine with Facebook</p>
          </span>
        </button>
      </form>
    </div>
  );
};

export default SignInOrCreateAccount;

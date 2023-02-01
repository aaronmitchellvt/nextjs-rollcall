import supabase from "@/lib/supabase";
import Head from "next/head";
import { useQuery } from "react-query";
import SignIn from "../SignIn";
import Footer from "./Footer";
import Navbar from "./Navbar";
export interface IPrimaryLayout {}

const PrimaryLayout: React.FC<IPrimaryLayout> = ({ children }) => {
  //Get the user from the session, if there is no user then null is returned
  const fetchUser = async () => {
    const { data } = await supabase.auth.getUser();
    return data;
  };
  //Call fetchUser and "wrap" the promise using react query to drive the UI
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser(),
  });
  const isLoggedIn = data?.user !== null && !isLoading && !isError;
  console.log("isLoggedIn: ", isLoggedIn);

  //What you see in the browser
  let pageContent: React.ReactNode = <></>;
  if (isLoading) {
    pageContent = <h1>Loading..</h1>;
  } else if (!isLoggedIn) {
    pageContent = (
      <>
        <SignIn />
      </>
    );
  } else if (isLoggedIn) {
    pageContent = children;
  }
  return (
    <>
      <Head>
        <title>Rollcall</title>
      </Head>
      <Navbar />
      <main className="flex flex-col h-screen w-full justify-between">
        {pageContent}
      </main>
      <Footer />
    </>
  );
};

export default PrimaryLayout;

import EventList from "@/components/EventList";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import PrimaryLayout from "@/components/layout/PrimaryLayout";
import { useUser } from "@supabase/auth-helpers-react";
import { NextPageWithLayout } from "./page";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const Home: NextPageWithLayout = () => {

  return (
    <>
      <PrimaryLayout>
        <main className="bg-gray-200 h-full overflow-y-scroll">
          <div className="m-4 p-2">
            <EventList />
          </div>
        </main>
      </PrimaryLayout>
    </>
  );
};

export default Home;

Home.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

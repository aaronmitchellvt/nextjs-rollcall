import EventList from "@/components/EventList";
import PrimaryLayout from "@/components/layout/PrimaryLayout";
import { NextPageWithLayout } from "./page";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <main className="bg-gray-200 h-full overflow-y-scroll">
        <div className="m-4 p-2">
          <EventList />
        </div>
      </main>
    </>
  );
};

export default Home;

Home.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

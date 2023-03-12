import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "./Footer";
import Navbar from "./Navbar";

export interface IPrimaryLayout {
  children: React.ReactNode;
}

const PrimaryLayout: React.FC<IPrimaryLayout> = ({ children }) => {

  return (
    <>
      <Head>
        <title>Rollcall</title>
      </Head>
      <Navbar />
      <main className="flex flex-col h-screen w-full justify-between overflow-y-scroll">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default PrimaryLayout;



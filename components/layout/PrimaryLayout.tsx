import Head from "next/head";
import Footer from "./Footer";
import Navbar from "./Navbar";
export interface IPrimaryLayout {}

const PrimaryLayout: React.FC<IPrimaryLayout> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Rollcall</title>
      </Head>
      <Navbar />
      <main className="flex flex-col h-screen justify-between">{children}</main>
      <Footer />
    </>
  );
};

export default PrimaryLayout;

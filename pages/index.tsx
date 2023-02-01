import PrimaryLayout from '@/components/layout/PrimaryLayout';
import Head from 'next/head'
import Image from 'next/image'
import { NextPageWithLayout } from './page';


const Home: NextPageWithLayout = () => {
  return (
    <>
      <main className="bg-green-700">
        <div>
          Hello World
        </div>
      </main>
    </>
  )
}

export default Home;

Home.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

import { useRouter } from "next/router";

export interface EventShowPageProps {
}

const EventShowPageProps: React.FC<EventShowPageProps> = () => {
  const { query } = useRouter();


  //Get data on specific event

  return (<div className="bg-green-700"></div>);
};

export default EventShowPageProps;
import Head from 'next/head';
import EventList from '../components/events/EventList';
import { getFeaturedEvents } from '../helpres/api-util';

const HomePage = (props) => {
  console.log(props);
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta name="description" content="다양한 이벤트를 제공합니다" />
      </Head>
      <EventList items={props.events} />
    </div>
  );
};

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}

export default HomePage;

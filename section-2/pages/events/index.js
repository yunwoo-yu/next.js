import Head from 'next/head';
import { useRouter } from 'next/router';
import EventList from '../../components/events/EventList';
import EventSearch from '../../components/events/EventSearch';
import { getAllEvents } from '../../helpres/api-util';

const AllEventsPage = (props) => {
  const router = useRouter();
  const { events } = props;

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  };

  return (
    <>
      <Head>
        <title>All Events</title>
        <meta name="description" content="Find" />
      </Head>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
};

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events,
    },
    revalidate: 60,
  };
}
export default AllEventsPage;

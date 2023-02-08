import EventList from '../components/events/EventList';
import { getFeaturedEvents } from '../helpres/api-util';

const HomePage = (props) => {
  console.log(props);
  return (
    <div>
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

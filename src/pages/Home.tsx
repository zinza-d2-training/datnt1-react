import AggregateInfo from 'components/AggregateInfo';
import Footer from 'components/Footer';
import Header from 'components/Header';
import InjectionPoint from 'components/InjectionPoint';
import LineChart from 'components/LineChart';

const Home = () => {
  return (
    <>
      <Header />
      <AggregateInfo />
      <LineChart />
      <InjectionPoint />
      <Footer />
    </>
  );
};

export default Home;

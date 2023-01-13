import React from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import AggregateInfo from 'components/AggregateInfo';
import LineChart from 'components/LineChart';
import InjectionPoint from 'components/InjectionPoint';
import styled from '@emotion/styled';
import MenuItemContent from 'components/MenuItemContent';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

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

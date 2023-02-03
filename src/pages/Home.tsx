import styled from '@emotion/styled';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import AggregateInfo from 'components/AggregateInfo';
import Footer from 'components/Footer';
import Header from 'components/Header';
import InjectionPoint from 'components/InjectionPoint';
import LineChart from 'components/LineChart';
import { getUserInfoAsync } from 'features/user/userSlice';
import useAccessToken from 'hooks/useAccessToken';
import { useEffect } from 'react';
import { RootState, useAppDispatch, useAppSelector } from 'store';

const CircularProgressLoading = styled(CircularProgress)`
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 100%;
`;

const BoxContainer = styled(Box)`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Home = () => {
  const dispatch = useAppDispatch();
  const selectUser = useAppSelector((state: RootState) => state.user);
  const token = useAccessToken();

  useEffect(() => {
    if (token) {
      dispatch(getUserInfoAsync(token));
    }
  }, []);

  return selectUser.loading ? (
    <BoxContainer>
      <CircularProgressLoading />
    </BoxContainer>
  ) : (
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

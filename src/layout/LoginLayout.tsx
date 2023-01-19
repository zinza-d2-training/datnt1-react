import styled from '@emotion/styled';
import loginImg from 'assets/img/login.png';
import { Outlet } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;

  position: relative;
  width: 100%;
  height: 100vh;

  background: #ffffff;
`;

const SideLeft = styled.div`
  flex: 1;
  width: 50%;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  height: 100vh;
`;

const Image = styled.img`
  width: 50%;
  height: 100vh;
  position: fixed;
  object-fit: cover;
  z-index: 100;
`;
const SideRight = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;

  width: 50%;
  min-height: 100vh;
`;

const LoginLayout = () => {
  return (
    <Container>
      <SideLeft>
        <Image src={loginImg} />
      </SideLeft>
      <SideRight>
        <Outlet />
      </SideRight>
    </Container>
  );
};

export default LoginLayout;

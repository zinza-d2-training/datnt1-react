import styled from '@emotion/styled';
import loginImg from 'assets/img/login.png';
import { Outlet } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;

  position: relative;
  width: 100vw;
  height: 100vh;

  background: #ffffff;

  overflow-x: hidden;
`;

const SideLeft = styled.div`
  width: 50vw;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  height: 100vh;
`;

const Image = styled.img`
  width: 50vw;
  height: 100vh;
  position: fixed;
  object-fit: cover;
  z-index: 100;
`;
const SideRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;

  width: 50vw;
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
        {/* <ForgotPassword /> */}
      </SideRight>
    </Container>
  );
};

export default LoginLayout;

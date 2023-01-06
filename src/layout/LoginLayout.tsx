import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import loginImg from 'assets/img/login.png';
import ForgotPassword from 'pages/forgotPassword';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;

  position: relative;
  width: 100vw;
  /* height: 1000px; */

  background: #ffffff;
`;

const SideLeft = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;

  width: 100%;
  height: 500px;

  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  object-fit: cover;
`;
const SideRight = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;

  width: 700px;
  height: 1000px;
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

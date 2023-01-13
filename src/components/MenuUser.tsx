import React from 'react';
import styled from '@emotion/styled';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const MenuUserContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0px 36px;
  gap: 16px;

  height: 64px;
`;

const PresentItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 8px;

  height: 64px;
  background: #ffffff;

  box-shadow: inset 0px -2px 0px rgba(0, 0, 0, 0.87);
`;

const PresentItemTypo = styled(Typography)`
  min-height: 24px;

  font-family: 'Roboto';
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.04px;

  color: rgba(0, 0, 0, 0.87);
`;

const MenuUserItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 8px;
  width: 130px;
  height: 64px;
  background: #ffffff;
`;

const MenuUserItemTypo = styled(Typography)`
  min-height: 24px;

  font-family: 'Roboto';
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.04px;

  color: #6e6d7a;
`;

const MenuUser = () => {
  return (
    <MenuUserContainer>
      <PresentItem>
        <PresentItemTypo>Chứng nhận tiêm chủng</PresentItemTypo>
      </PresentItem>
      <MenuUserItem>
        <MenuUserItemTypo>Kết quả đăng ký</MenuUserItemTypo>
      </MenuUserItem>
      <MenuUserItem>
        <MenuUserItemTypo>Tài khoản</MenuUserItemTypo>
      </MenuUserItem>
    </MenuUserContainer>
  );
};

export default MenuUser;

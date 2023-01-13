import React from 'react';
import styled from '@emotion/styled';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import StyledLink from './StyledLink';

const MenuUserContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0px 36px;
  gap: 16px;

  height: 64px;
`;

const MenuUserItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 8px;
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

const PresentItem = styled(MenuUserItem)`
  box-shadow: inset 0px -2px 0px rgba(0, 0, 0, 0.87);
`;

const PresentItemTypo = styled(MenuUserItemTypo)`
  color: rgba(0, 0, 0, 0.87);
`;

interface MenuUserProps {
  presentPage: number;
}

const MenuUser = ({ presentPage }: MenuUserProps) => {
  return (
    <MenuUserContainer>
      {presentPage === 1 ? (
        <PresentItem>
          <PresentItemTypo>Chứng nhận tiêm chủng</PresentItemTypo>
        </PresentItem>
      ) : (
        <StyledLink to="/vaccination-certificate">
          <MenuUserItem>
            <MenuUserItemTypo>Chứng nhận tiêm chủng</MenuUserItemTypo>
          </MenuUserItem>
        </StyledLink>
      )}
      {presentPage === 2 ? (
        <PresentItem>
          <PresentItemTypo>Kết quả đăng ký</PresentItemTypo>
        </PresentItem>
      ) : (
        <StyledLink to="/registration-result">
          <MenuUserItem>
            <MenuUserItemTypo>Kết quả đăng ký</MenuUserItemTypo>
          </MenuUserItem>
        </StyledLink>
      )}
      {presentPage === 3 ? (
        <PresentItem>
          <PresentItemTypo>Tài khoản</PresentItemTypo>
        </PresentItem>
      ) : (
        <StyledLink to="/account">
          <MenuUserItem>
            <MenuUserItemTypo>Tài khoản</MenuUserItemTypo>
          </MenuUserItem>
        </StyledLink>
      )}
    </MenuUserContainer>
  );
};

export default MenuUser;

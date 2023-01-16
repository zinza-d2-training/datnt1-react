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
  userTab: string;
}

const userTabs = [
  { tab: 'vaccination-certificate', content: 'Chứng nhận tiêm chủng' },
  { tab: 'registration-result', content: 'Kết quả đăng ký' },
  { tab: 'account', content: 'Tài khoản' }
];

const MenuUser = ({ userTab }: MenuUserProps) => {
  return (
    <MenuUserContainer>
      {userTabs.map((tab) =>
        tab.tab === userTab ? (
          <PresentItem>
            <PresentItemTypo>{tab.content}</PresentItemTypo>
          </PresentItem>
        ) : (
          <StyledLink to={`/user/${tab.tab}`}>
            <MenuUserItem>
              <MenuUserItemTypo>{tab.content}</MenuUserItemTypo>
            </MenuUserItem>
          </StyledLink>
        )
      )}
    </MenuUserContainer>
  );
};

export default MenuUser;

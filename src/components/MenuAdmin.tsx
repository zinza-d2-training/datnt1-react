import React from 'react';
import styled from '@emotion/styled';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import StyledLink from './StyledLink';

const MenuAdminContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0px 36px;
  gap: 16px;

  height: 64px;
`;

const MenuAdminItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 8px;
  height: 64px;
  background: #ffffff;
`;

const MenuAdminItemTypo = styled(Typography)`
  min-height: 24px;

  font-family: 'Roboto';
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.04px;

  color: #6e6d7a;
`;

const PresentItem = styled(MenuAdminItem)`
  box-shadow: inset 0px -2px 0px rgba(0, 0, 0, 0.87);
`;

const PresentItemTypo = styled(MenuAdminItemTypo)`
  color: rgba(0, 0, 0, 0.87);
`;

interface MenuAdminProps {
  adminTab: AdminTabs;
}

export type AdminTabs = 'injection-point' | 'registration' | 'doccument';

const MenuAdmin = ({ adminTab }: MenuAdminProps) => {
  return (
    <MenuAdminContainer>
      {adminTab === 'injection-point' ? (
        <PresentItem>
          <PresentItemTypo>Điểm tiêm</PresentItemTypo>
        </PresentItem>
      ) : (
        <StyledLink to="/admin/injection-point">
          <MenuAdminItem>
            <MenuAdminItemTypo>Điểm tiêm</MenuAdminItemTypo>
          </MenuAdminItem>
        </StyledLink>
      )}
      {adminTab === 'registration' ? (
        <PresentItem>
          <PresentItemTypo>Đăng ký</PresentItemTypo>
        </PresentItem>
      ) : (
        <StyledLink to="/admin/registration">
          <MenuAdminItem>
            <MenuAdminItemTypo>Đăng ký</MenuAdminItemTypo>
          </MenuAdminItem>
        </StyledLink>
      )}
      {adminTab === 'doccument' ? (
        <PresentItem>
          <PresentItemTypo>Tài liệu</PresentItemTypo>
        </PresentItem>
      ) : (
        <StyledLink to="/admin/doccument">
          <MenuAdminItem>
            <MenuAdminItemTypo>Tài liệu</MenuAdminItemTypo>
          </MenuAdminItem>
        </StyledLink>
      )}
    </MenuAdminContainer>
  );
};

export default MenuAdmin;

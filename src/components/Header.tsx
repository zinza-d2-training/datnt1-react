import React from 'react';
import styled from '@emotion/styled';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import LogoIcon from 'assets/img/Logo.png';

const HeaderContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 36px;

  width: 100vw;
  min-height: 80px;
  background: linear-gradient(
    90deg,
    #ed1b23 0%,
    #2e3091 52.08%,
    #253494 100%,
    #253494 100%
  );

  /* position: fixed; */
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  z-index: 20;
`;

const Brand = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 16px;

  max-width: 435px;
  min-height: 50px;
`;

const Logo = styled.img`
  width: 42px;
  min-height: 50px;
`;

const BrandTypography = styled(Typography)`
  max-width: 377px;
  min-height: 32px;
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 20px;
  line-height: 160%;
  /* identical to box height, or 32px */

  letter-spacing: -0.05px;

  /* White */

  color: #ffffff;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 0px;
  gap: 24px;

  min-width: 524px;
  min-height: 50px;
`;

const MenuItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;

  min-width: 51px;
  min-height: 50px;
`;

const MenuItemTypography = styled(Typography)`
  min-width: 51px;
  min-height: 24px;

  font-family: 'Roboto';
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  /* identical to box height, or 24px */

  letter-spacing: -0.04px;

  /* White */
  color: #ffffff;
`;

const MenuItemButton = styled(Button)`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 22px;
  gap: 4px;

  width: 140px;
  height: 40px;

  background: #ffffff;
  border-radius: 8px 8px 8px 0px;

  font-family: 'Roboto';
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.04px;
  text-transform: uppercase;
  color: #303f9f;

  &:hover {
    background-color: rgba(0, 0, 0, 0);
    border: 2px solid #fff;
    color: #fff;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Brand>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Logo src={LogoIcon} alt="Logo" />
        </Link>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <BrandTypography>CỔNG THÔNG TIN TIÊM CHỦNG COVID-19</BrandTypography>
        </Link>
      </Brand>
      <Menu>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <MenuItem>
            <MenuItemTypography>Trang chủ</MenuItemTypography>
          </MenuItem>
        </Link>
        <Link
          to="/injection-registration/step1"
          style={{ textDecoration: 'none' }}>
          <MenuItem>
            <MenuItemTypography>Đăng ký tiêm</MenuItemTypography>
          </MenuItem>
        </Link>
        <MenuItem>
          <MenuItemTypography>Tra cứu</MenuItemTypography>
        </MenuItem>
        <MenuItem>
          <MenuItemTypography>Tài liệu</MenuItemTypography>
        </MenuItem>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <MenuItem>
            <MenuItemButton>Đăng nhập</MenuItemButton>
          </MenuItem>
        </Link>
      </Menu>
    </HeaderContainer>
  );
};

export default Header;

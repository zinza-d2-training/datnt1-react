import styled from '@emotion/styled';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button, Menu, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import LogoIcon from 'assets/img/Logo.png';
import StyledLink from 'components/StyledLink';
import { logoutAsync } from 'features/user/userSlice';
import useAccessToken from 'hooks/useAccessToken';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { RootState } from 'store/store';
import MenuItemContent from './MenuItemContent';

const HeaderContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 36px;

  width: 100%;
  min-height: 80px;
  background: linear-gradient(
    90deg,
    #ed1b23 0%,
    #2e3091 52.08%,
    #253494 100%,
    #253494 100%
  );

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
  min-height: 50px;
`;

const Logo = styled.img`
  width: 42px;
  height: 46px;
`;

const BrandTypography = styled(Typography)`
  max-width: 377px;
  min-height: 32px;
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 20px;
  line-height: 160%;
  letter-spacing: -0.05px;

  color: #ffffff;
`;

const MenuRight = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 0px;
  gap: 24px;

  min-height: 50px;

  & .MuiList-root {
    padding: 0px;
  }
`;

const MenuRightButton = styled(Button)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;

  min-width: 51px;
  min-height: 50px;
  text-transform: none;

  color: #fff;
`;

const MenuItemTypography = styled(Typography)`
  min-width: 51px;
  min-height: 24px;

  font-family: 'Roboto';
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.04px;

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

  min-width: 140px;
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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useAppDispatch();
  const selectUser = useAppSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const token = useAccessToken();

  const handleLoginClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!token) {
      navigate('login');
    }
  };

  const handleLogoutClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (token) {
      dispatch(logoutAsync());
      navigate('login');
    }
  };

  return (
    <HeaderContainer>
      <Brand>
        <StyledLink to="/">
          <Logo src={LogoIcon} alt="Logo" />
        </StyledLink>
        <StyledLink to="/">
          <BrandTypography>CỔNG THÔNG TIN TIÊM CHỦNG COVID-19</BrandTypography>
        </StyledLink>
      </Brand>
      <MenuRight>
        <StyledLink to="/">
          <MenuRightButton>
            <MenuItemTypography>Trang chủ</MenuItemTypography>
          </MenuRightButton>
        </StyledLink>
        <StyledLink to="/injection-registration/step1">
          <MenuRightButton>
            <MenuItemTypography>Đăng ký tiêm</MenuItemTypography>
          </MenuRightButton>
        </StyledLink>
        <MenuRightButton onClick={handleClick}>
          <MenuItemTypography>Tra cứu</MenuItemTypography>
          <KeyboardArrowDownIcon />
        </MenuRightButton>
        <Menu
          MenuListProps={{ disablePadding: true }}
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: -150
          }}>
          <MenuItemContent handleClose={handleClose} />
        </Menu>
        <StyledLink to="/admin/document">
          <MenuRightButton>
            <MenuItemTypography>Tài liệu</MenuItemTypography>
          </MenuRightButton>
        </StyledLink>
        {token ? (
          <>
            <MenuRightButton>
              <MenuItemButton onClick={() => navigate('user/account')}>
                {selectUser.userInfo.fullname}
              </MenuItemButton>
            </MenuRightButton>
            <MenuRightButton>
              <MenuItemButton onClick={handleLogoutClick}>
                Đăng xuất
              </MenuItemButton>
            </MenuRightButton>
          </>
        ) : (
          <MenuRightButton>
            <MenuItemButton onClick={handleLoginClick}>
              Đăng nhập
            </MenuItemButton>
          </MenuRightButton>
        )}
      </MenuRight>
    </HeaderContainer>
  );
};

export default Header;

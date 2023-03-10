import styled from '@emotion/styled';
import { Typography } from '@mui/material';

import EastIcon from '@mui/icons-material/East';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import StyledLink from './StyledLink';

const ListContainer = styled.ul`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px 0px;
  margin: 0;
  width: 361px;
  height: 180px;

  background: #ffffff;
  box-shadow: 0px 10px 70px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  & .MuiTooltip-popper {
    display: none;
  }
  & li:hover {
    color: #281ba4;
  }
`;

const ListItemContainer = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 40px;
  gap: 16px;

  min-height: 74px;
  & .purpleIcon {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 6px;

    width: 36px;
    height: 36px;

    background: #ede7f6;
    border-radius: 6px;
    font-size: 24px;
    color: #5e35b1;
  }

  & .blueIcon {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 6px;

    width: 36px;
    height: 36px;

    background: #ede7f6;
    border-radius: 6px;

    color: #1e88e5;
  }
`;

const ListItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px;

  min-height: 42px;
`;

const ListItemTypo = styled(Typography)`
  max-width: 177px;
  min-height: 24px;

  font-family: 'Roboto';
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;

  letter-spacing: -0.04px;

  color: rgba(0, 0, 0, 0.87);
`;

const ListItemTypoSmall = styled(Typography)`
  max-width: 179px;
  min-height: 18px;

  font-family: 'Roboto';
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;

  letter-spacing: -0.04px;

  color: rgba(0, 0, 0, 0.87);
`;

interface MenuItemContentProps {
  handleClose: () => void;
}

const MenuItemContent = ({ handleClose }: MenuItemContentProps) => {
  return (
    <ListContainer>
      <StyledLink to={'/user/vaccination-certificate'}>
        <ListItemContainer onClick={handleClose}>
          <PeopleAltIcon className="purpleIcon" />
          <ListItem>
            <ListItemTypo>Tra c???u ch???ng nh???n ti??m</ListItemTypo>
            <ListItemTypoSmall>
              C???p nh???t nhanh v?? ch??nh x??c nh???t
            </ListItemTypoSmall>
          </ListItem>
          <EastIcon sx={{ color: '#5E35B1' }} />
        </ListItemContainer>
      </StyledLink>
      <StyledLink to={'/user/registration-result'}>
        <ListItemContainer onClick={handleClose}>
          <PeopleAltIcon className="blueIcon" />
          <ListItem>
            <ListItemTypo>Tra c???u k???t qu??? ????ng k??</ListItemTypo>
            <ListItemTypoSmall>
              C???p nh???t nhanh v?? ch??nh x??c nh???t
            </ListItemTypoSmall>
          </ListItem>
          <EastIcon sx={{ color: '#1E88E5' }} />
        </ListItemContainer>
      </StyledLink>
    </ListContainer>
  );
};

export default MenuItemContent;

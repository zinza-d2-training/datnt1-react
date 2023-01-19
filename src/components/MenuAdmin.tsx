import styled from '@emotion/styled';
import { Typography } from '@mui/material';
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
  adminTab: string;
}

const adminTabs = [
  { tab: 'injection-point', content: 'Điểm tiêm' },
  { tab: 'registration', content: 'Đăng ký' },
  { tab: 'document', content: 'Tài liệu' }
];

const MenuAdmin = ({ adminTab }: MenuAdminProps) => {
  return (
    <MenuAdminContainer>
      {adminTabs.map((tab) =>
        tab.tab === adminTab ? (
          <PresentItem>
            <PresentItemTypo>{tab.content}</PresentItemTypo>
          </PresentItem>
        ) : (
          <StyledLink to={`/admin/${tab.tab}`}>
            <MenuAdminItem>
              <MenuAdminItemTypo>{tab.content}</MenuAdminItemTypo>
            </MenuAdminItem>
          </StyledLink>
        )
      )}
    </MenuAdminContainer>
  );
};

export default MenuAdmin;

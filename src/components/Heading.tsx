import styled from '@emotion/styled';
import { Typography } from '@mui/material';

const HeadingContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 36px;
  margin: 34px 0px 46px;
  height: 64px;

  background: #f5f5f5;
`;
const HeadingTypo = styled(Typography)`
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 28px;
  line-height: 133.4%;

  color: rgba(0, 0, 0, 0.87);
`;

const Heading = () => {
  return (
    <HeadingContainer>
      <HeadingTypo>Tra cứu đăng ký tiêm</HeadingTypo>
    </HeadingContainer>
  );
};

export default Heading;

import React from 'react';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import ic_register_people from 'assets/img/ic_register_people.png';
import ic_injection from 'assets/img/ic_injection.png';
import ic_injected_people from 'assets/img/ic_injected_people.png';

const InfoContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 36px;
  margin-top: 24px;
  flex-wrap: wrap;

  width: 100%;
  min-height: 92px;
  background: #f7fbfe;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 0px 16px;
  gap: 16px;

  flex: 1;
  min-height: 60px;
  width: 100%;
  background: #ffffff;
`;

const Icon = styled.img`
  width: 46px;
  height: 44px;
`;

const InfoFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;

  min-height: 60px;
`;

const InfoKey = styled(Typography)`
  max-width: 190px;
  min-height: 19px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;

  color: #000000;
`;

const InfoValue = styled(Typography)`
  max-width: 176px;
  min-height: 33px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 33px;
  display: flex;
  align-items: center;

  color: #000000;
  & .MuiTypography-root {
    max-width: 176px;
    height: 33px;
    font-family: 'Roboto';
    font-style: italic;
    font-weight: 500;
    font-size: 13px;
    line-height: 15px;
    display: flex;
    align-items: flex-end;

    color: #000000;
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 60px;

  background: #eeeeee;
`;

const AggregateInfo = () => {
  return (
    <InfoContainer>
      <InfoItem>
        <Icon src={ic_register_people} />
        <InfoFrame>
          <InfoKey>Đối tượng đăng ký tiêm</InfoKey>
          <InfoValue>
            11,203,873 <Typography>(lượt)</Typography>
          </InfoValue>
        </InfoFrame>
      </InfoItem>
      <Divider></Divider>
      <InfoItem>
        <Icon src={ic_injection} />
        <InfoFrame>
          <InfoKey>Số mũi tiêm hôm qua</InfoKey>
          <InfoValue>
            1,762,119 <Typography>(mũi)</Typography>
          </InfoValue>
        </InfoFrame>
      </InfoItem>
      <Divider></Divider>
      <InfoItem>
        <Icon src={ic_injected_people} />
        <InfoFrame>
          <InfoKey>Số mũi đã tiêm toàn quốc</InfoKey>
          <InfoValue>
            69,523,654 <Typography>(mũi)</Typography>
          </InfoValue>
        </InfoFrame>
      </InfoItem>
    </InfoContainer>
  );
};

export default AggregateInfo;

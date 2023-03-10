import styled from '@emotion/styled';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button, Typography } from '@mui/material';

import Heading from 'components/Heading';
import Stepper from 'components/Stepper';
import StyledLink from 'components/StyledLink';

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 0px 36px;
  margin-top: 80px;
  min-height: 364px;
`;

const ResultTypo = styled(Typography)`
  min-height: 32px;

  font-family: 'Roboto';
  font-weight: 500;
  font-size: 20px;
  line-height: 160%;
  letter-spacing: -0.05px;
  text-align: center;

  color: rgba(0, 0, 0, 0.87);

  & .MuiTypography-root {
    font-family: 'Roboto';
    font-weight: 500;
    font-size: 20px;
    line-height: 160%;

    letter-spacing: -0.05px;
    color: #ef5350;
  }
`;

const ResultThanksTypo = styled(Typography)`
  min-height: 48px;

  font-family: 'Roboto';
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.04px;
  text-align: center;

  color: rgba(0, 0, 0, 0.87);

  & .MuiTypography-root {
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;

    letter-spacing: -0.04px;
    color: #1e88e5;
  }
`;

const SuggestAppTypo = styled(Typography)`
  min-height: 24px;

  font-family: 'Roboto';
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  letter-spacing: -0.04px;

  color: rgba(0, 0, 0, 0.87);

  margin-bottom: 24px;

  & .MuiTypography-root {
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    letter-spacing: -0.04px;
    color: #d32f2f;
    text-decoration: none;
  }
`;

const ResultFrame = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  min-height: 52;
`;

const ResultFrameItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  padding: 0px;
  gap: 4px;

  min-height: 52px;
`;

const FrameItemKey = styled(Typography)`
  height: 24px;

  font-family: 'Roboto';
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.04px;

  color: rgba(0, 0, 0, 0.87);
`;

const FrameItemValue = styled(Typography)`
  height: 24px;

  font-family: 'Roboto';
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.04px;

  color: rgba(0, 0, 0, 0.87);
`;

const SubmitContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 24px 0px 0px;
  gap: 16px;
  width: 100%;
  min-height: 60px;
  margin-bottom: 918px;
`;

const BackSubmitButton = styled(Button)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px 16px;
  gap: 4px;

  max-width: 160px;
  min-height: 36px;

  border: 1px solid #303f9f;
  border-radius: 8px 8px 8px 0px;

  font-family: 'Roboto';
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.04px;
  text-transform: uppercase;

  color: #303f9f;
`;

const ContinueSubmitButton = styled(Button)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px 32px;
  gap: 4px;

  max-width: 219px;
  min-height: 36px;

  background: #303f9f;
  border-radius: 8px 8px 8px 0px;

  font-family: 'Roboto';
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.04px;
  text-transform: uppercase;

  color: #fff;

  &:hover {
    background-color: #1e2f97 !important;
    border-color: #1e2f97 !important;
    color: #ffffff;
  }
`;

const InjectionRegistrationStep2 = () => {
  return (
    <div>
      <Heading />
      <Stepper step={3} />
      <ResultContainer>
        <ResultTypo>
          ????ng k?? ti??m ch???ng COVID-19 th??nh c??ng. M?? ?????t ti??m c???a b???n l??{' '}
          <Typography component="span">0120211103501237</Typography>.
        </ResultTypo>
        <ResultThanksTypo>
          C???m ??n qu?? kh??ch ???? ????ng k?? ti??m ch???ng v???c xin COVID-19. Hi???n t???i B??? y
          t??? ??ang ti???n h??nh thu th???p nhu c???u v?? th??ng tin ????? l???p danh s??ch ?????i
          t?????ng ????ng k?? ti??m v???c xin COVID-19 theo t???ng ?????a b??n. Ch??ng t??i s???
          li??n h??? v???i qu?? kh??ch theo s??? ??i???n tho???i{' '}
          <Typography component="span">0123456789</Typography> khi c?? k??? ho???ch
          ti??m trong th???i gian s???m nh???t.
        </ResultThanksTypo>
        <SuggestAppTypo>
          M???i b???n t???i ???ng d???ng "S??? S???C KH???E ??I???N T???" t???i{' '}
          <Typography
            component="a"
            href="https://hssk.kcb.vn/#/sskdt"
            target={'_blank'}>
            https://hssk.kcb.vn/#/sskdt
          </Typography>{' '}
          ????? theo d??i k???t qu??? ????ng k?? ti??m v?? nh???n ch???ng nh???n ti??m ch???ng
          COVID-19
        </SuggestAppTypo>
        <ResultFrame>
          <ResultFrameItem>
            <FrameItemKey>H??? v?? t??n</FrameItemKey>
            <FrameItemValue>Nguy???n V??n A</FrameItemValue>
          </ResultFrameItem>
          <ResultFrameItem>
            <FrameItemKey>Ng??y sinh</FrameItemKey>
            <FrameItemValue>16/10/1 994</FrameItemValue>
          </ResultFrameItem>
          <ResultFrameItem>
            <FrameItemKey>Gi???i t??nh</FrameItemKey>
            <FrameItemValue>Nam</FrameItemValue>
          </ResultFrameItem>
        </ResultFrame>
        <ResultFrame>
          <ResultFrameItem>
            <FrameItemKey>S??? CMND/CCCD/M?? ?????nh danh c??ng d??n</FrameItemKey>
            <FrameItemValue>030012345678</FrameItemValue>
          </ResultFrameItem>
          <ResultFrameItem>
            <FrameItemKey>S??? th??? BHYT</FrameItemKey>
            <FrameItemValue></FrameItemValue>
          </ResultFrameItem>
          <ResultFrameItem>
            <FrameItemKey></FrameItemKey>
            <FrameItemValue></FrameItemValue>
          </ResultFrameItem>
        </ResultFrame>
        <ResultFrame>
          <ResultFrameItem>
            <FrameItemKey>T???nh/Th??nh ph???</FrameItemKey>
            <FrameItemValue>Th??nh ph??? H?? N???i </FrameItemValue>
          </ResultFrameItem>
          <ResultFrameItem>
            <FrameItemKey>Qu???n/Huy???n</FrameItemKey>
            <FrameItemValue>Qu???n Long Bi??n</FrameItemValue>
          </ResultFrameItem>
          <ResultFrameItem>
            <FrameItemKey>X??/Ph?????ng</FrameItemKey>
            <FrameItemValue>Ph?????ng Giang Bi??n</FrameItemValue>
          </ResultFrameItem>
        </ResultFrame>
      </ResultContainer>
      <SubmitContainer>
        <StyledLink to="/">
          <BackSubmitButton>
            <ArrowBackIcon />
            Trang Ch???
          </BackSubmitButton>
        </StyledLink>
        <StyledLink to="/">
          <ContinueSubmitButton>
            Xu???t th??ng tin
            <ArrowForwardIcon />
          </ContinueSubmitButton>
        </StyledLink>
      </SubmitContainer>
    </div>
  );
};

export default InjectionRegistrationStep2;

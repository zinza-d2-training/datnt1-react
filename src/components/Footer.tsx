import styled from '@emotion/styled';
import { Button, Typography } from '@mui/material';
import Cert from 'assets/img/cert.png';
import Logo2in1 from 'assets/img/logo2in1.png';

const FooterContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 32px 16px;
  margin-top: 37px;
  width: 100%;
  min-height: 256px;

  background: #2d2188;
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;

  min-height: 137px;
`;

const CopyRightTypo = styled(Typography)`
  max-width: 557px;
  min-height: 20px;

  font-family: 'Roboto';
  font-weight: 400;
  font-size: 14px;
  line-height: 143%;
  letter-spacing: -0.04px;

  color: #ffffff;
`;

const DevByTypo = styled(Typography)`
  max-width: 135px;
  min-height: 20px;
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 14px;
  line-height: 143%;
  letter-spacing: -0.04px;

  color: #ffffff;
`;

const RedDevByTypo = styled(Typography)`
  color: #d32f2f;
  display: inline;
`;

const LogoContainer = styled.div``;

const Logo = styled.img`
  width: 195px;
  height: 89px;
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding: 0px;
  gap: 16px;

  min-height: 192px;
`;

const DownloadTypo = styled.div`
  max-width: 450px;
  min-height: 20px;

  font-family: 'Roboto';
  font-weight: 400;
  font-size: 14px;
  line-height: 143%;
  letter-spacing: -0.04px;

  color: #ffffff;
`;

const AppsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0px;
  gap: 16px;

  width: 100%;
  min-height: 40px;
`;

const AppButton = styled(Button)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 22px;
  gap: 4px;

  border: 1px solid #ffffff;
  border-radius: 8px 8px 8px 0px;
  font-family: 'Roboto';
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.04px;

  color: #ffffff;
  text-transform: none;
`;

const CertImg = styled.img`
  width: 220px;
  height: 100px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <LeftSide>
        <CopyRightTypo>
          ?? B???n quy???n thu???c TRUNG T??M C??NG NGH??? PH??NG, CH???NG D???CH COVID-19 QU???C
          GIA
        </CopyRightTypo>
        <DevByTypo>
          Ph??t tri???n b???i <RedDevByTypo>Viettel</RedDevByTypo>
        </DevByTypo>
        <LogoContainer>
          <Logo src={Logo2in1} />
        </LogoContainer>
      </LeftSide>
      <RightSide>
        <DownloadTypo>
          T???i s??? s???c kh???e ??i???n t??? ????? ????ng k?? ti??m v?? nh???n gi???y ch???ng nh???n ti??m
        </DownloadTypo>
        <AppsContainer>
          <AppButton>App ti??m di ?????ng (Cho HCM)</AppButton>
          <AppButton>App Store</AppButton>
          <AppButton>Google play</AppButton>
        </AppsContainer>
        <CertImg src={Cert}></CertImg>
      </RightSide>
    </FooterContainer>
  );
};

export default Footer;

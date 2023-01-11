import React from 'react';
import styled from '@emotion/styled';
import { Button, Typography } from '@mui/material';
import Logo2in1 from 'assets/img/logo2in1.png';
import Cert from 'assets/img/cert.png';

const FooterContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 32px 16px;
  margin-top: 37px;
  width: 100vw;
  min-height: 256px;

  background: #2d2188;
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;

  max-width: 50vw;
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
  /* Auto layout */

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding: 0px;
  gap: 16px;

  width: 50vw;
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

  /* min-width: fit-content; */

  border: 1px solid #ffffff;
  border-radius: 8px 8px 8px 0px;
  font-family: 'Roboto';
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.04px;

  color: #ffffff;
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
          © Bản quyền thuộc TRUNG TÂM CÔNG NGHỆ PHÒNG, CHỐNG DỊCH COVID-19 QUỐC
          GIA
        </CopyRightTypo>
        <DevByTypo>
          Phát triển bởi <RedDevByTypo>Viettel</RedDevByTypo>
        </DevByTypo>
        <LogoContainer>
          <Logo src={Logo2in1} />
        </LogoContainer>
      </LeftSide>
      <RightSide>
        <DownloadTypo>
          Tải sổ sức khỏe điện tử để đăng ký tiêm và nhận giấy chứng nhận tiêm
        </DownloadTypo>
        <AppsContainer>
          <AppButton>App tiêm di động (Cho HCM)</AppButton>
          <AppButton>App Store</AppButton>
          <AppButton>Google play</AppButton>
        </AppsContainer>
        <CertImg src={Cert}></CertImg>
      </RightSide>
    </FooterContainer>
  );
};

export default Footer;

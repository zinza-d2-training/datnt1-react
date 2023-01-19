import React from 'react';
import styled from '@emotion/styled';
import { Typography, Button, TextField, Select, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PersonIcon from '@mui/icons-material/Person';
import DateRangeIcon from '@mui/icons-material/DateRange';
import FeaturedVideoIcon from '@mui/icons-material/FeaturedVideo';

import Footer from 'components/Footer';
import Header from 'components/Header';
import MenuUser from 'components/MenuUser';
import { injectionInforRows } from 'dummy-data';
import InjectionPoint from 'components/InjectionPoint';
import LogoCard from 'assets/img/Logo.png';
import QRCodeImg from 'assets/img/qr-code.png';
import Divider from 'components/Divider';

const ResultContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  padding: 0px 36px;
  max-width: 100%;
  background: #ffffff;
`;

const CertificateContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 8px;
  /* width: 100%; */
`;

const Typo1 = styled(Typography)`
  min-height: 24px;

  font-family: 'Roboto';
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  letter-spacing: -0.04px;

  color: rgba(0, 0, 0, 0.87);
`;

const Typo2 = styled(Typography)`
  min-height: 24px;

  font-family: 'Roboto';
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  letter-spacing: -0.04px;

  color: rgba(0, 0, 0, 0.87);
`;

const Typo3 = styled(Typography)`
  padding: 24px 0px 0px;

  min-height: 56px;

  font-family: 'Roboto';
  font-weight: 500;
  font-size: 24px;
  line-height: 133.4%;
  text-align: center;

  color: rgba(0, 0, 0, 0.87);
`;

const CertificateFrame = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 24px 0px 0px;
  flex-wrap: wrap;

  width: 100%;
  min-height: 76px;
`;

const CertificateItem = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;

  min-height: 52px;
`;

const CertificateItemKey = styled(Typography)`
  min-height: 24px;

  font-family: 'Roboto';
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.04px;
  color: rgba(0, 0, 0, 0.87);
`;

const CertificateItemValue = styled(Typography)`
  min-height: 24px;

  font-family: 'Roboto';
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.04px;

  color: rgba(0, 0, 0, 0.87);
`;

const SubmitContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px 0px 0px;

  width: 100%;
  min-height: 52px;
`;

const RegisterButton = styled(Button)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px 16px;
  gap: 4px;

  max-width: 255px;
  height: 36px;

  background: #303f9f;
  border-radius: 8px 8px 8px 0px;

  font-family: 'Roboto';
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.04px;
  text-transform: uppercase;
  color: #ffffff;

  &:hover {
    background-color: #1e2f97 !important;
    border-color: #1e2f97 !important;
    color: #ffffff;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
  gap: 24px;

  width: 340px;
  min-height: 668px;

  background: #43a047;
  box-shadow: 0px 16px 48px rgba(0, 0, 0, 0.175);
  border-radius: 8px 8px 8px 0px;
`;

const Logo = styled.img`
  width: 100px;
  height: 100px;
`;

const CardTypo = styled(Typography)`
  max-width: 270px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 133.4%;
  color: #ffffff;
`;

const QRCode = styled.img`
  width: 196px;
  height: 196px;
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  gap: 16px;

  width: 292px;
  min-height: 220px;

  background: #ffffff;
  border-radius: 8px 8px 8px 0px;
`;

const CardInfoItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;

  width: 260px;
  min-height: 52px;
`;

const CardInfoItemDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;

  width: 228px;
  min-height: 52px;
`;

const CardInfoItemKey = styled.div`
  min-height: 24px;

  font-family: 'Roboto';
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.04px;

  color: rgba(0, 0, 0, 0.87);
`;

const CardInfoItemValue = styled.div`
  min-height: 24px;

  font-family: 'Roboto';
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.04px;

  color: rgba(0, 0, 0, 0.87);
`;

const StyledTable = styled(Table)(() => ({
  border: '1px solid #EEEEEE',
  borderRadius: '0'
}));

const StyledTableHead = styled(TableHead)(() => ({
  background: 'rgba(238, 238, 238, 0.4)',
  borderBottom: '2px solid #EEEEEE'
}));

const VaccinationCertificate = () => {
  return (
    <div>
      <MenuUser userTab={'vaccination-certificate'} />
      <Divider />
      <ResultContainer>
        <CertificateContainer>
          <Typo1>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</Typo1>
          <Typo2>Độc lập - Tự do - Hạnh phúc</Typo2>
          <Typo3>CHỨNG NHẬN TIÊM CHỦNG COVID-19</Typo3>
          <CertificateFrame>
            <CertificateItem>
              <CertificateItemKey>Họ và tên</CertificateItemKey>
              <CertificateItemValue>Nguyễn Văn A</CertificateItemValue>
            </CertificateItem>
            <CertificateItem>
              <CertificateItemKey>Ngày sinh</CertificateItemKey>
              <CertificateItemValue>16/10/1994</CertificateItemValue>
            </CertificateItem>
            <CertificateItem>
              <CertificateItemKey>Số CMND/CCCD</CertificateItemKey>
              <CertificateItemValue>030012345678</CertificateItemValue>
            </CertificateItem>
            <CertificateItem>
              <CertificateItemKey>Số thẻ BHYT</CertificateItemKey>
              <CertificateItemValue>030094005102</CertificateItemValue>
            </CertificateItem>
          </CertificateFrame>
          <CertificateFrame>
            <CertificateItem>
              <CertificateItemKey>Địa chỉ</CertificateItemKey>
              <CertificateItemValue>
                Phường Giang Biên - Quận Long Biên - Thành phố Hà Nội
              </CertificateItemValue>
            </CertificateItem>
          </CertificateFrame>
          <CertificateFrame>
            <CertificateItem>
              <CertificateItemKey>Kết luận</CertificateItemKey>
              <CertificateItemValue>
                Đã được tiêm phòng vắc xin phòng bệnh Covid-19
              </CertificateItemValue>
            </CertificateItem>
          </CertificateFrame>

          <TableContainer
            component={Paper}
            sx={{ boxShadow: 'none', marginTop: '16px' }}>
            <StyledTable sx={{ minWidth: 700 }} aria-label="customized table">
              <StyledTableHead>
                <TableRow>
                  <TableCell>Mũi số</TableCell>
                  <TableCell align="center">Thời gian tiêm</TableCell>
                  <TableCell align="center">Tên vắc xin</TableCell>
                  <TableCell align="center">Số lô</TableCell>
                  <TableCell align="center">Nơi tiêm</TableCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {injectionInforRows.map((row) => (
                  <TableRow key={row.injectionNumber}>
                    <TableCell align="center">{row.injectionNumber}</TableCell>
                    <TableCell align="center">{row.injectionTime}</TableCell>
                    <TableCell align="center">{row.vaccineName}</TableCell>
                    <TableCell align="center">{row.lotNumber}</TableCell>
                    <TableCell align="center">
                      {row.injectionPointName}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </StyledTable>
          </TableContainer>
          <SubmitContainer>
            <RegisterButton>Đăng ký mũi tiêm tiếp theo</RegisterButton>
          </SubmitContainer>
        </CertificateContainer>
        <CardContainer>
          <Logo src={LogoCard} />
          <CardTypo>ĐÃ TIÊM 2 MŨI VẮC XIN</CardTypo>
          <QRCode src={QRCodeImg} />
          <CardInfo>
            <CardInfoItem>
              <PersonIcon />
              <CardInfoItemDetail>
                <CardInfoItemKey>Họ và tên</CardInfoItemKey>
                <CardInfoItemValue>Nguyễn Văn A</CardInfoItemValue>
              </CardInfoItemDetail>
            </CardInfoItem>
            <CardInfoItem>
              <DateRangeIcon />
              <CardInfoItemDetail>
                <CardInfoItemKey>Ngày sinh</CardInfoItemKey>
                <CardInfoItemValue>16/10/1994</CardInfoItemValue>
              </CardInfoItemDetail>
            </CardInfoItem>
            <CardInfoItem>
              <FeaturedVideoIcon />
              <CardInfoItemDetail>
                <CardInfoItemKey>Số CMND/CCCD</CardInfoItemKey>
                <CardInfoItemValue>030012345678</CardInfoItemValue>
              </CardInfoItemDetail>
            </CardInfoItem>
          </CardInfo>
        </CardContainer>
      </ResultContainer>
    </div>
  );
};

export default VaccinationCertificate;
function rgba(
  arg0: number,
  arg1: number,
  arg2: number,
  arg3: number
):
  | import('csstype').Property.Background<string | number>
  | NonNullable<
      import('csstype').Property.Background<string | number> | undefined
    >[]
  | (string | (string & {}))[]
  | undefined {
  throw new Error('Function not implemented.');
}

import styled from '@emotion/styled';
import DateRangeIcon from '@mui/icons-material/DateRange';
import FeaturedVideoIcon from '@mui/icons-material/FeaturedVideo';
import PersonIcon from '@mui/icons-material/Person';
import { Button, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import LogoCard from 'assets/img/Logo.png';
import QRCodeImg from 'assets/img/qr-code.png';
import Divider from 'components/Divider';
import MenuUser from 'components/MenuUser';
import { injectionInforRows } from 'dummy-data';

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
          <Typo1>C???NG H??A X?? H???I CH??? NGH??A VI???T NAM</Typo1>
          <Typo2>?????c l???p - T??? do - H???nh ph??c</Typo2>
          <Typo3>CH???NG NH???N TI??M CH???NG COVID-19</Typo3>
          <CertificateFrame>
            <CertificateItem>
              <CertificateItemKey>H??? v?? t??n</CertificateItemKey>
              <CertificateItemValue>Nguy???n V??n A</CertificateItemValue>
            </CertificateItem>
            <CertificateItem>
              <CertificateItemKey>Ng??y sinh</CertificateItemKey>
              <CertificateItemValue>16/10/1994</CertificateItemValue>
            </CertificateItem>
            <CertificateItem>
              <CertificateItemKey>S??? CMND/CCCD</CertificateItemKey>
              <CertificateItemValue>030012345678</CertificateItemValue>
            </CertificateItem>
            <CertificateItem>
              <CertificateItemKey>S??? th??? BHYT</CertificateItemKey>
              <CertificateItemValue>030094005102</CertificateItemValue>
            </CertificateItem>
          </CertificateFrame>
          <CertificateFrame>
            <CertificateItem>
              <CertificateItemKey>?????a ch???</CertificateItemKey>
              <CertificateItemValue>
                Ph?????ng Giang Bi??n - Qu???n Long Bi??n - Th??nh ph??? H?? N???i
              </CertificateItemValue>
            </CertificateItem>
          </CertificateFrame>
          <CertificateFrame>
            <CertificateItem>
              <CertificateItemKey>K???t lu???n</CertificateItemKey>
              <CertificateItemValue>
                ???? ???????c ti??m ph??ng v???c xin ph??ng b???nh Covid-19
              </CertificateItemValue>
            </CertificateItem>
          </CertificateFrame>
          <TableContainer
            component={Paper}
            sx={{ boxShadow: 'none', marginTop: '16px' }}>
            <StyledTable sx={{ minWidth: 700 }} aria-label="customized table">
              <StyledTableHead>
                <TableRow>
                  <TableCell>M??i s???</TableCell>
                  <TableCell align="center">Th???i gian ti??m</TableCell>
                  <TableCell align="center">T??n v???c xin</TableCell>
                  <TableCell align="center">S??? l??</TableCell>
                  <TableCell align="center">N??i ti??m</TableCell>
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
            <RegisterButton>????ng k?? m??i ti??m ti???p theo</RegisterButton>
          </SubmitContainer>
        </CertificateContainer>
        <CardContainer>
          <Logo src={LogoCard} />
          <CardTypo>???? TI??M 2 M??I V???C XIN</CardTypo>
          <QRCode src={QRCodeImg} />
          <CardInfo>
            <CardInfoItem>
              <PersonIcon />
              <CardInfoItemDetail>
                <CardInfoItemKey>H??? v?? t??n</CardInfoItemKey>
                <CardInfoItemValue>Nguy???n V??n A</CardInfoItemValue>
              </CardInfoItemDetail>
            </CardInfoItem>
            <CardInfoItem>
              <DateRangeIcon />
              <CardInfoItemDetail>
                <CardInfoItemKey>Ng??y sinh</CardInfoItemKey>
                <CardInfoItemValue>16/10/1994</CardInfoItemValue>
              </CardInfoItemDetail>
            </CardInfoItem>
            <CardInfoItem>
              <FeaturedVideoIcon />
              <CardInfoItemDetail>
                <CardInfoItemKey>S??? CMND/CCCD</CardInfoItemKey>
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

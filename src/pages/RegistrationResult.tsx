import styled from '@emotion/styled';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Divider from 'components/Divider';
import MenuUser from 'components/MenuUser';
import { registerResult } from 'dummy-data';

const StyledTableHead = styled(TableHead)(() => ({
  background: 'rgba(238, 238, 238, 0.4)',
  borderBottom: '2px solid #EEEEEE'
}));

const StyledTable = styled(Table)(() => ({
  border: '1px solid #EEEEEE',
  borderRadius: '0',
  padding: '0px 36px'
}));

const StyledTableCell = styled(TableCell)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 'auto',
  margin: 'auto',
  border: 'none',
  height: '100%'
}));

const FrameTableCell = styled.div`
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2px 0px;

  width: 246.4px;
  height: 24px;
  background: #e8eaf6;

  border: 1px solid #3f51b5;
  border-radius: 30px;
`;

const RegistrationResult = () => {
  return (
    <div>
      <MenuUser userTab={'registration-result'} />
      <Divider />
      <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
        <StyledTable sx={{ minWidth: 700 }} aria-label="customized table">
          <StyledTableHead>
            <TableRow>
              <TableCell align="center">Số thứ tự</TableCell>
              <TableCell align="center">Họ và tên</TableCell>
              <TableCell align="center">Ngày sinh </TableCell>
              <TableCell align="center">Giới tính</TableCell>
              <TableCell align="center">
                Số CMND/CCCD/Mã định danh công dân
              </TableCell>
              <TableCell align="center">Trạng thái</TableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {registerResult.map((row) => (
              <TableRow key={row.numericalOder}>
                <TableCell align="center">{row.numericalOder}</TableCell>
                <TableCell align="center">{row.fullname}</TableCell>
                <TableCell align="center">{row.birthday}</TableCell>
                <TableCell align="center">{row.gender}</TableCell>
                <TableCell align="center">{row.identificationCode}</TableCell>
                <StyledTableCell align="center">
                  <FrameTableCell>{row.status}</FrameTableCell>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </TableContainer>
    </div>
  );
};

export default RegistrationResult;

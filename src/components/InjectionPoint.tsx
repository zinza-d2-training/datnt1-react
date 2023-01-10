import React from 'react';
import styled from '@emotion/styled';
import { Button, Typography, TextField, MenuItem, Select } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TablePaginationActions from 'components/TablePaginationActions';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableFooter,
  TablePagination
} from '@mui/material';
import { districts, provinces, rows, wards } from 'dummyData';

const Wrapper = styled.div`
  box-sizing: border-box;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 36px;
  /* width: 100vw; */
`;

const InjectionPointContainer = styled.div`
  /* Auto layout */

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 12px;

  width: 100%;
  /* min-height: 637px; */

  background: #ffffff;

  border: 1px solid rgba(38, 56, 150, 0.14);
  box-shadow: 0px 4px 12px rgba(34, 41, 47, 0.12);
  border-radius: 10px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px 10px;
  gap: 10px;

  max-width: 1344px;
  height: 55px;
`;

const TitleTypo = styled(Typography)`
  max-width: 300px;
  height: 23px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
  display: flex;
  align-items: center;

  color: #000000;
`;

const SearchRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px 0px 16px;
  gap: 16px;

  max-width: 1344px;
  min-height: 56px;
`;

const InputComnponent = styled.div`
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 5px;

  width: 260px;
  height: 40px;

  background: #ffffff;
  & .select {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px 8px;
    height: 40px;
  }
`;

const SearchButton = styled(Button)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  gap: 8px;

  min-width: 148px;
  height: 40px;

  background: #171a88;
  border-radius: 8px 8px 8px 0px;

  font-family: 'Roboto';
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;

  color: #ffffff;
  /* & :hover {
    background-color: #1e2f97 !important;
    border-color: #1e2f97 !important;
    color: #ffffff;
  } */
`;

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f8f8f8'
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

const InjectionPoint = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Wrapper>
      <InjectionPointContainer>
        <Title>
          <TitleTypo>Tra cứu điểm tiêm theo địa bàn</TitleTypo>
        </Title>
        <SearchRow>
          <InputComnponent>
            <Select
              className="select"
              fullWidth
              displayEmpty={true}
              id="province"
              renderValue={(selected: any) => {
                if (!selected) {
                  return (
                    <span style={{ color: '#c5c5c5' }}>Tỉnh/Thành phố</span>
                  );
                }
                return selected;
              }}>
              {provinces.map((province) => (
                <MenuItem key={province.id} value={province.name}>
                  {province.name}
                </MenuItem>
              ))}
            </Select>
          </InputComnponent>
          <InputComnponent>
            <Select
              className="select"
              fullWidth
              displayEmpty={true}
              id="province"
              renderValue={(selected: any) => {
                if (!selected) {
                  return <span style={{ color: '#c5c5c5' }}>Quận/Huyện</span>;
                }
                return selected;
              }}>
              {districts.map((district) => (
                <MenuItem key={district.id} value={district.name}>
                  {district.name}
                </MenuItem>
              ))}
            </Select>
          </InputComnponent>
          <InputComnponent>
            <Select
              className="select"
              fullWidth
              displayEmpty={true}
              id="province"
              renderValue={(selected: any) => {
                if (!selected) {
                  return <span style={{ color: '#c5c5c5' }}>Xã/Phường</span>;
                }
                return selected;
              }}>
              {wards.map((ward) => (
                <MenuItem key={ward.id} value={ward.name}>
                  {ward.name}
                </MenuItem>
              ))}
            </Select>
          </InputComnponent>
          <SearchButton
            startIcon={
              <SearchIcon style={{ width: '24px', height: '24px' }} />
            }>
            Tìm kiếm
          </SearchButton>
        </SearchRow>

        <TableContainer component={Paper} sx={{ border: 'none' }}>
          <Table aria-label="simple table" sx={{ border: 'none' }}>
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell align="center">Tên điểm tiêm</TableCell>
                <TableCell align="center">Số nhà, tên đường</TableCell>
                <TableCell align="center">Xã/Phường</TableCell>
                <TableCell align="center">Quận/Huyện</TableCell>
                <TableCell align="center">Tỉnh/Thành phố</TableCell>
                <TableCell align="center">
                  Người đứng đầu cơ sở tiêm chủng
                </TableCell>
                <TableCell align="center">Số bàn tiêm</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map((row) => (
                <StyledTableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.detailAddress}</TableCell>
                  <TableCell align="center">{row.ward[0].name}</TableCell>
                  <TableCell align="center">{row.district[0].name}</TableCell>
                  <TableCell align="center">{row.province[0].name}</TableCell>
                  <TableCell align="center">{row.leader}</TableCell>
                  <TableCell align="center">
                    {row.numberOfInjectionTables}
                  </TableCell>
                </StyledTableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={8}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'Số bản ghi'
                    },
                    native: false
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </InjectionPointContainer>
    </Wrapper>
  );
};

export default InjectionPoint;

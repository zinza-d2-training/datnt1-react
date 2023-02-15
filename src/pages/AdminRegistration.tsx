import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import SearchIcon from '@mui/icons-material/Search';
import {
  Button,
  Dialog,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import AdminEditDialog from 'components/AdminEditDialog';
import Divider from 'components/Divider';
import MenuAdmin from 'components/MenuAdmin';
import TablePaginationActions from 'components/TablePaginationActions';
import { rows } from 'dummy-data';
import {
  getVaccinationSiteAsync,
  VaccinationSiteInfo
} from 'features/vaccination/vaccinationSiteSlice';
import { RootState, useAppDispatch, useAppSelector } from 'store/index';
import {
  getAllRegisterInfo,
  RegisterInfo,
  SearchFilterDefault
} from 'features/vaccination/injectionRegistrationSlice';
import AdminInjectionRegisterEditDialog from 'components/AdminInjectionRegisterEditDialog';
import dayjs from 'dayjs';

const SearchContainer = styled.div`
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px 12px 0px;
  margin-top: 42px;
  width: 100%;
  background: #ffffff;

  border: 1px solid rgba(38, 56, 150, 0.14);
`;

const SearchRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px 0px 16px;
  gap: 16px;

  width: 100%;
  min-height: 56px;
  border-bottom: 1px solid #eeeeee;
  & .MuiButton-root:hover {
    background-color: #1e2f97 !important;
    border-color: #1e2f97 !important;
    color: #ffffff;
  }
`;

const InputComnponent = styled.div`
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 5px;

  width: 260px;
  height: 40px;

  background: #ffffff;

  & .MuiInputBase-root {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 40px;
  }

  & .MuiSelect-select {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px 8px;
    height: 40px;
  }
`;

const PlaceholderTypo = styled(Typography)`
  height: 23px;

  font-family: 'Roboto';
  font-weight: 400;
  font-size: 16px;
  line-height: 23px;

  color: rgba(0, 0, 0, 0.6);
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
  text-transform: none;
`;

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f8f8f8'
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  },
  '&:hover': {
    cursor: 'pointer'
  }
}));

export interface SearchByKeyInputs {
  fullname?: string;
  identification_card?: string;
}

const searchSchema = yup.object().shape({
  fullname: yup.string(),
  identification_card: yup.string()
});

const AdminRegistration = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [open, setOpen] = React.useState(false);

  // const [listSites, setListSites] = React.useState<string[]>([]);
  const [chosenRegister, setChosenRegister] = React.useState<RegisterInfo>();

  const dispatch = useAppDispatch();
  const selectRegisterInfo = useAppSelector(
    (state: RootState) => state.injectionRegistration.registerInfo
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm<SearchByKeyInputs>({
    resolver: yupResolver(searchSchema)
  });

  const handleClickOpen = (
    event: React.MouseEvent<unknown>,
    register: RegisterInfo
  ) => {
    setChosenRegister(register);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearchClick: SubmitHandler<SearchByKeyInputs> = (
    data: SearchByKeyInputs
  ) => {
    dispatch(getAllRegisterInfo(data));
  };

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

  useEffect(() => {
    dispatch(getAllRegisterInfo(SearchFilterDefault));
    // const listSites = selectVaccinationSites.map((site) => site.name);
    // setListSites(listSites);
  }, []);

  return (
    <div>
      <MenuAdmin adminTab={'registration'} />
      <Divider />
      <SearchContainer>
        <SearchRow>
          <InputComnponent>
            <TextField
              {...register('fullname')}
              type="text"
              id="fullname"
              placeholder="Họ và tên"
              fullWidth
              required
            />
          </InputComnponent>
          <InputComnponent>
            <TextField
              {...register('identification_card')}
              type="text"
              id="identification_card"
              placeholder="Số CMND/CCCD"
              fullWidth
              required
            />
          </InputComnponent>
          <SearchButton onClick={handleSubmit(handleSearchClick)}>
            <SearchIcon />
            Tìm kiếm
          </SearchButton>
        </SearchRow>
        <TableContainer
          component={Paper}
          sx={{ border: 'none', boxShadow: 'none' }}>
          <Table aria-label="simple table" sx={{ border: 'none' }}>
            <TableHead>
              <TableRow>
                <TableCell align="center">STT</TableCell>
                <TableCell align="center">Họ và tên</TableCell>
                <TableCell align="center">Số CMND/CCCD</TableCell>
                <TableCell align="center">Ngày tiêm dự kiến</TableCell>
                <TableCell align="center">Loại Vaccine</TableCell>
                <TableCell align="center">Số lô</TableCell>
                <TableCell align="center">Điểm Tiêm</TableCell>
                <TableCell align="center">Trạng Thái</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? selectRegisterInfo?.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : selectRegisterInfo
              ).map((register: RegisterInfo, index: number) => (
                <StyledTableRow
                  hover
                  onClick={(e) => handleClickOpen(e, register)}
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{register.fullname}</TableCell>
                  <TableCell align="center">
                    {register.identification_card}
                  </TableCell>
                  <TableCell align="center">
                    {register.expected_injection_date
                      ? dayjs(register.expected_injection_date).format(
                          'DD/MM/YYYY'
                        )
                      : null}
                  </TableCell>
                  <TableCell align="center">{register.vaccine_name}</TableCell>
                  <TableCell align="center">{register.lot_number}</TableCell>
                  <TableCell align="center">
                    {register.vaccination_site_name}
                  </TableCell>
                  <TableCell align="center">{register.status}</TableCell>
                </StyledTableRow>
              ))}
              <Dialog open={open} onClose={handleClose}>
                <AdminInjectionRegisterEditDialog
                  handleClose={handleClose}
                  registerInfo={chosenRegister}
                />
              </Dialog>
              {emptyRows > 0 && (
                <TableRow sx={{ height: 53 * emptyRows }}>
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
                  labelRowsPerPage="Số bản ghi:"
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </SearchContainer>
    </div>
  );
};

export default AdminRegistration;

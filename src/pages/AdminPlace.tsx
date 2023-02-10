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
  SearchFilterDefault,
  VaccinationSiteInfo
} from 'features/vaccination/vaccinationSiteSlice';
import { RootState, useAppDispatch, useAppSelector } from 'store/index';

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
  name?: string;
  address?: string;
}

const searchSchema = yup.object().shape({
  injectionPoint: yup.string(),
  address: yup.string()
});

const AdminPlace = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [open, setOpen] = React.useState(false);

  const [listSites, setListSites] = React.useState<string[]>([]);
  const [chosenSite, setChosenSite] = React.useState<VaccinationSiteInfo>();

  const dispatch = useAppDispatch();

  const selectVaccinationSites = useAppSelector(
    (state: RootState) => state.vaccinationSite.vaccinationSites
  );

  const handleClickOpen = (
    event: React.MouseEvent<unknown>,
    site: VaccinationSiteInfo
  ) => {
    setChosenSite(site);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearchClick: SubmitHandler<SearchByKeyInputs> = (
    data: SearchByKeyInputs
  ) => {
    dispatch(getVaccinationSiteAsync(data));
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm<SearchByKeyInputs>({
    resolver: yupResolver(searchSchema)
  });

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
    dispatch(getVaccinationSiteAsync(SearchFilterDefault));
    const listSites = selectVaccinationSites.map((site) => site.name);
    setListSites(listSites);
  }, []);

  return (
    <div>
      <MenuAdmin adminTab={'injection-point'} />
      <Divider />
      <SearchContainer>
        <SearchRow>
          <InputComnponent>
            <TextField
              {...register('name')}
              type="text"
              id="name"
              placeholder="Điểm tiêm"
              fullWidth
              required
            />
          </InputComnponent>
          <InputComnponent>
            <TextField
              {...register('address')}
              type="text"
              id="address"
              placeholder="Địa chỉ"
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
                <TableCell align="center">Tên điểm tiêm</TableCell>
                <TableCell align="center">Địa chỉ</TableCell>
                <TableCell align="center">
                  Người đứng đầu cơ sở tiêm chủng
                </TableCell>
                <TableCell align="center">Số bàn tiêm</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? selectVaccinationSites.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : selectVaccinationSites
              ).map((site: VaccinationSiteInfo, index: number) => (
                <>
                  <StyledTableRow
                    hover
                    onClick={(e) => handleClickOpen(e, site)}
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{site.name}</TableCell>
                    <TableCell align="center">{site.address}</TableCell>
                    <TableCell align="center">{site.leader}</TableCell>
                    <TableCell align="center">
                      {site.number_of_tables}
                    </TableCell>
                  </StyledTableRow>
                </>
              ))}
              <Dialog open={open} onClose={handleClose}>
                <AdminEditDialog
                  handleClose={handleClose}
                  site={chosenSite}
                  listSites={listSites}
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

export default AdminPlace;

import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import SearchIcon from '@mui/icons-material/Search';
import {
  Button,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import TablePaginationActions from 'components/TablePaginationActions';
import {
  District,
  districts,
  Province,
  provinces,
  rows,
  Ward,
  wards
} from 'dummy-data';

const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 36px;
  width: 100%;
`;

const InjectionPointContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 12px;
  width: 100%;
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
  }
}));

interface SearchInputs {
  province: string;
  district?: string;
  ward?: string;
}

const searchSchema = yup.object().shape({
  province: yup.string().required('T??n th??nh ph??? kh??ng ???????c b??? tr???ng')
});

const InjectionPoint = () => {
  const [provincesData, setProvincesData] = React.useState(provinces);
  const [districtsData, setDistrictsData] = React.useState(districts);
  const [wardsData, setWardsData] = React.useState(wards);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const {
    register,
    handleSubmit,
    watch,
    resetField,
    formState: { errors, isValid }
  } = useForm<SearchInputs>({
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
    resetField('district');
    resetField('ward');
    // L???y provinceId hi???n t???i ??ang ch???n
    const province: Province[] = provinces.filter((province) => {
      return province.name === watch('province');
    });

    //L???y ra c??c qu???n thu???c province ??ang ch???n
    const districtArr: District[] = districts.filter((district) => {
      return district.provinceId === province[0]?.id;
    });
    setDistrictsData(districtArr);
  }, [watch('province')]);

  useEffect(() => {
    resetField('ward');
    // L???y districtId hi???n t???i ??ang ch???n
    const district: District[] = districts.filter((district) => {
      return district.name === watch('district');
    });

    //L???y ra c??c qu???n thu???c district ??ang ch???n
    const wardArr: Ward[] = wards.filter((ward) => {
      return ward.districtId === district[0]?.id;
    });

    setWardsData(wardArr);
  }, [watch('district')]);

  return (
    <Wrapper>
      <InjectionPointContainer>
        <Title>
          <TitleTypo>Tra c???u ??i???m ti??m theo ?????a b??n</TitleTypo>
        </Title>
        <SearchRow>
          <InputComnponent>
            <Select
              {...register('province')}
              fullWidth
              displayEmpty={true}
              id="province"
              renderValue={(selected: string) => {
                if (!selected) {
                  return <PlaceholderTypo>T???nh/Th??nh ph???</PlaceholderTypo>;
                }
                return selected;
              }}>
              {provincesData.map((province) => (
                <MenuItem key={province.id} value={province.name}>
                  {province.name}
                </MenuItem>
              ))}
            </Select>
          </InputComnponent>
          <InputComnponent>
            <Select
              disabled={watch('province') ? false : true}
              {...register('district')}
              fullWidth
              displayEmpty={true}
              id="district"
              renderValue={(selected: string) => {
                if (!watch('district')) {
                  return <PlaceholderTypo>Qu???n/Huy???n</PlaceholderTypo>;
                } else {
                  return selected;
                }
              }}>
              {districtsData.map((district) => (
                <MenuItem key={district.id} value={district.name}>
                  {district.name}
                </MenuItem>
              ))}
            </Select>
          </InputComnponent>
          <InputComnponent>
            <Select
              disabled={watch('district') ? false : true}
              {...register('ward')}
              fullWidth
              displayEmpty={true}
              id="ward"
              renderValue={(selected: string) => {
                if (!watch('ward')) {
                  return <PlaceholderTypo>X??/Ph?????ng</PlaceholderTypo>;
                } else {
                  return selected;
                }
              }}>
              {wardsData.map((ward) => (
                <MenuItem key={ward.id} value={ward.name}>
                  {ward.name}
                </MenuItem>
              ))}
            </Select>
          </InputComnponent>
          <SearchButton>
            <SearchIcon />
            T??m ki???m
          </SearchButton>
        </SearchRow>

        <TableContainer
          component={Paper}
          sx={{ border: 'none', boxShadow: 'none' }}>
          <Table aria-label="simple table" sx={{ border: 'none' }}>
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell align="center">T??n ??i???m ti??m</TableCell>
                <TableCell align="center">S??? nh??, t??n ???????ng</TableCell>
                <TableCell align="center">X??/Ph?????ng</TableCell>
                <TableCell align="center">Qu???n/Huy???n</TableCell>
                <TableCell align="center">T???nh/Th??nh ph???</TableCell>
                <TableCell align="center">
                  Ng?????i ?????ng ?????u c?? s??? ti??m ch???ng
                </TableCell>
                <TableCell align="center">S??? b??n ti??m</TableCell>
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
                  labelRowsPerPage="S??? b???n ghi:"
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

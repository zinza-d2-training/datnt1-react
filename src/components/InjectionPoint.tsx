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
import React, { useEffect, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import TablePaginationActions from 'components/TablePaginationActions';
import { District, Province } from 'dummy-data';
import {
  getDistrictsByProvinceIdAsync,
  getProvincesAsync,
  getWardsByDistrictIdAsync
} from 'features/administrative_unit/administrativeSlice';
import {
  getVaccinationSiteAsync,
  SearchFilterDefault,
  VaccinationSiteInfo
} from 'features/vaccination/vaccinationSiteSlice';
import { RootState, useAppDispatch, useAppSelector } from 'store/index';

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
  province?: string;
  district?: string;
  ward?: string;
}

const searchSchema = yup.object().shape({});

const InjectionPoint = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const { register, handleSubmit, watch, resetField } = useForm<SearchInputs>({
    resolver: yupResolver(searchSchema)
  });

  const selectVaccinationSites = useAppSelector(
    (state: RootState) => state.vaccinationSite.vaccinationSites
  );

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - selectVaccinationSites.length)
      : 0;

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

  const dispatch = useAppDispatch();

  const selectProvinces = useAppSelector(
    (state: RootState) => state.administrativeUnit.provinces
  );

  const selectDistricts = useAppSelector(
    (state: RootState) => state.administrativeUnit.districts
  );

  const selectWards = useAppSelector(
    (state: RootState) => state.administrativeUnit.wards
  );

  const currentProvince = useMemo(() => {
    return selectProvinces?.find(
      (province) => province.name === watch('province')
    );
  }, [watch('province')]);

  const currentDistrict = useMemo(() => {
    return selectDistricts?.find(
      (district) => district.name === watch('district')
    );
  }, [watch('district')]);

  const currentWard = useMemo(() => {
    return selectWards?.find((ward) => ward.name === watch('ward'));
  }, [watch('ward')]);

  const searchFilter = useMemo(() => {
    return {
      province_id: currentProvince?.province_id,
      district_id: currentDistrict?.district_id,
      ward_id: currentWard?.ward_id
    };
  }, [watch('province'), watch('district'), watch('ward')]);

  useEffect(() => {
    resetField('province');

    async function fetchProvincesData() {
      // You can await here
      try {
        await dispatch(getProvincesAsync());
      } catch (error: any) {
        throw new Error(error.message);
      }
    }
    fetchProvincesData();

    dispatch(getVaccinationSiteAsync(SearchFilterDefault));
  }, []);

  useEffect(() => {
    resetField('district');
    resetField('ward');

    // Lấy ra các quận thuộc province đang chọn
    async function fetchDistrictsData() {
      try {
        await dispatch(
          getDistrictsByProvinceIdAsync(currentProvince as Province)
        );
      } catch (error: any) {
        throw new Error(error.message);
      }
    }

    if (watch('province')) {
      fetchDistrictsData();
    }
  }, [watch('province')]);

  useEffect(() => {
    resetField('ward');

    //Lấy ra các quận thuộc district đang chọn
    async function fetchWardsData() {
      try {
        await dispatch(getWardsByDistrictIdAsync(currentDistrict as District));
      } catch (error: any) {
        throw new Error(error.message);
      }
    }

    if (watch('district')) {
      fetchWardsData();
    }
  }, [watch('district')]);

  const handleClick: SubmitHandler<SearchInputs> = () => {
    dispatch(getVaccinationSiteAsync(searchFilter));
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
              {...register('province')}
              fullWidth
              displayEmpty={true}
              id="province"
              renderValue={(selected: string) => {
                if (!selected) {
                  return <PlaceholderTypo>Tỉnh/Thành phố</PlaceholderTypo>;
                }
                return selected;
              }}>
              {selectProvinces.map((province) => (
                <MenuItem key={province.province_id} value={province.name}>
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
                  return <PlaceholderTypo>Quận/Huyện</PlaceholderTypo>;
                } else {
                  return selected;
                }
              }}>
              {selectDistricts.map((district) => (
                <MenuItem key={district.district_id} value={district.name}>
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
                  return <PlaceholderTypo>Xã/Phường</PlaceholderTypo>;
                } else {
                  return selected;
                }
              }}>
              {selectWards.map((ward) => (
                <MenuItem key={ward.ward_id} value={ward.name}>
                  {ward.name}
                </MenuItem>
              ))}
            </Select>
          </InputComnponent>
          <SearchButton onClick={handleSubmit(handleClick)}>
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
                ? selectVaccinationSites?.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : selectVaccinationSites
              )?.map((site: VaccinationSiteInfo, index: number) => (
                <StyledTableRow
                  hover
                  key={site.vaccination_site_id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{site.name}</TableCell>
                  <TableCell align="center">{site.address}</TableCell>
                  <TableCell align="center">{site.ward_name}</TableCell>
                  <TableCell align="center">{site.district_name}</TableCell>
                  <TableCell align="center">{site.province_name}</TableCell>
                  <TableCell align="center">{site.leader}</TableCell>
                  <TableCell align="center">{site.number_of_tables}</TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
            {emptyRows > 0 && (
              <TableRow sx={{ height: 53 * emptyRows }}>
                <TableCell
                  colSpan={Object.keys(selectVaccinationSites[0] || {})?.length}
                />
              </TableRow>
            )}

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={Object.keys(selectVaccinationSites[0] || {})?.length}
                  count={selectVaccinationSites?.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  labelRowsPerPage="Số bản ghi:"
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
                {/* <StyledTablePagination list={selectVaccinationSites} /> */}
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </InjectionPointContainer>
    </Wrapper>
  );
};

export default InjectionPoint;

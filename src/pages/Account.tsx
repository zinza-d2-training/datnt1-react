import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import CreateIcon from '@mui/icons-material/Create';
import {
  Button,
  FormHelperText,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Divider from 'components/Divider';
import MenuUser from 'components/MenuUser';
import dayjs, { Dayjs } from 'dayjs';
import {
  District,
  getDistrictsByProvinceIdAsync,
  getProvincesAsync,
  getWardsByDistrictIdAsync,
  Province
} from 'features/administrative_unit/administrativeSlice';
import { updateUserAsync } from 'features/user/userSlice';
import React, { useEffect, useMemo, useState } from 'react';
import { SubmitHandler } from 'react-hook-form/dist/types/form';
import { RootState, useAppDispatch, useAppSelector } from 'store/index';

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 36px;
  gap: 24px;

  width: 100%;
`;

const SectionInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px 8px;
  gap: 16px;
  width: 100%;

  background: #ffffff;
`;

const SectionHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 8px;

  width: 100%;
  min-height: 24px;

  & .MuiSvgIcon-root {
    color: rgba(0, 0, 0, 0.54);
  }
`;

const SectionHeaderTypo = styled(Typography)`
  max-width: 128px;

  font-family: 'Roboto';
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.04px;

  color: rgba(0, 0, 0, 0.87);
`;

const SectionContentRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0px 16px;
  gap: 16px;

  width: 100%;
  min-height: 69px;
`;

const InputComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 5px;

  width: 25%;
  min-height: 69px;

  background: #ffffff;

  & .MuiInputBase-root {
    height: 40px;
    color: rgba(0, 0, 0, 0.87);
  }
`;

const Label = styled.label`
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.87);
`;

const Field = styled(TextField)``;

const CancelButton = styled(Button)`
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;

  width: 84px;
  height: 36px;
  border: 1px solid rgba(63, 81, 181, 0.5);
  border-radius: 4px;

  font-family: 'Roboto';
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.46px;
  text-transform: uppercase;

  color: #3f51b5;
`;

const SavedButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;

  width: 60px;
  height: 36px;
  background: #3f51b5;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12);
  border-radius: 4px;

  font-family: 'Roboto';
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.46px;
  text-transform: uppercase;

  color: #ffffff;

  &:hover {
    background-color: #1e2f97 !important;
    border-color: #1e2f97 !important;
    color: #ffffff;
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

interface UserInfoInputs {
  identification_card: string;
  fullname: string;
  birthday: Dayjs | null;
  gender: string;
  province: string;
  district?: string;
  ward?: string;
  password: string;
  confirmedPassword: string;
}

const UserInfoSchema = yup.object().shape({
  identification_card: yup
    .string()
    .required('Số CMND/CCCD/Mã định danh không được bỏ trống')
    .matches(/^[0-9]+$/, 'Số CMND chỉ được chứa số ')
    .length(12, 'Số CMND phải chứa 12 số'),
  fullname: yup.string().required('Họ và tên không được bỏ trống'),
  birthday: yup
    .date()
    .max(new Date(), 'Ngày nhập vào không hợp lệ')
    .required('Ngày sinh không được bỏ trống')
    .typeError('Ngày nhập vào không hợp lệ'),

  gender: yup.string().required('Giới tính không được bỏ trống'),
  province: yup.string().required('Tỉnh/Thành phố không được bỏ trống'),
  district: yup.string().required('Quận/Huyện không được bỏ trống'),
  ward: yup.string().required('Xã/Phường không được bỏ trống'),
  password: yup.string(),
  confirmedPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
});

const Account = () => {
  const {
    register,
    handleSubmit,
    watch,
    resetField,
    setValue,
    formState: { errors }
  } = useForm<UserInfoInputs>({
    resolver: yupResolver(UserInfoSchema)
  });

  const [editInfo, setEditInfo] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  const dispatch = useAppDispatch();
  const selectUser = useAppSelector((state: RootState) => state.user.userInfo);

  const [value, setValues] = React.useState<Dayjs | null>(
    selectUser?.birthday ? dayjs(selectUser?.birthday) : null
  );

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

  useEffect(() => {
    setValue('identification_card', selectUser.identification_card);
    setValue('fullname', selectUser.fullname);
    setValue('birthday', selectUser.birthday);
    setValue('gender', selectUser.gender);
    setValue('province', selectUser.province_name);
    setValue('district', selectUser.district_name);
    setValue('ward', selectUser.ward_name);

    async function fetchProvincesData() {
      // You can await here
      try {
        await dispatch(getProvincesAsync());
      } catch (error: any) {
        throw new Error(error.message);
      }
    }

    fetchProvincesData();
  }, []);

  useEffect(() => {
    async function fetchDistrictsData() {
      try {
        await dispatch(
          getDistrictsByProvinceIdAsync(currentProvince as Province)
        );
      } catch (error: any) {
        throw new Error(error.message);
      }
    }

    if (editInfo) {
      resetField('district');
      resetField('ward');
    }

    if (watch('province') && currentProvince) {
      fetchDistrictsData();
    }
  }, [watch('province')]);

  useEffect(() => {
    async function fetchWardsData() {
      try {
        await dispatch(getWardsByDistrictIdAsync(currentDistrict as District));
      } catch (error: any) {
        throw new Error(error.message);
      }
    }

    if (editInfo) {
      resetField('ward');
    }

    if (watch('district') && currentDistrict) {
      fetchWardsData();
    }
  }, [watch('district')]);

  const handleUserInfoSaveClick: SubmitHandler<UserInfoInputs> = (data) => {
    const updateData = {
      identification_card: data.identification_card,
      fullname: data.fullname,
      birthday: data.birthday,
      gender: data.gender,
      ward_id: currentWard?.ward_id.toString()
    };

    dispatch(updateUserAsync(updateData));

    setEditInfo((prev) => !prev);
  };

  const handleEditInfoClick = () => {
    setEditInfo((prev) => !prev);
  };

  const handleEditPasswordClick = () => {
    setEditPassword((prev) => !prev);
  };

  const handlePasswordSaveClick: SubmitHandler<UserInfoInputs> = (data) => {
    const updateData = {
      password: data.password
    };

    dispatch(updateUserAsync(updateData));

    setEditPassword((prev) => !prev);
  };

  return (
    <div>
      <MenuUser userTab={'account'} />
      <Divider />
      <ResultContainer>
        <SectionInfo>
          <SectionHeader>
            <SectionHeaderTypo>Thông tin cá nhân</SectionHeaderTypo>
            <CreateIcon onClick={handleEditInfoClick} />
          </SectionHeader>
          <SectionContentRow>
            <InputComponent>
              <Label htmlFor="identification_card">
                Số CMND/CCCD/Mã định danh
              </Label>
              <Field
                disabled={!editInfo}
                {...register('identification_card')}
                helperText={errors.identification_card?.message}
                id="identification_card"
                defaultValue={selectUser.identification_card}
                type="text"
                fullWidth
                required
                FormHelperTextProps={{
                  sx: { color: '#d32f2f', margin: '3px 0px 0px' }
                }}
              />
            </InputComponent>
          </SectionContentRow>
        </SectionInfo>
        <SectionInfo>
          <SectionContentRow>
            <InputComponent>
              <Label htmlFor="fullname">Họ và tên</Label>
              <Field
                {...register('fullname')}
                helperText={errors.fullname?.message}
                type="text"
                id="fullname"
                defaultValue={selectUser.fullname}
                disabled={!editInfo}
                fullWidth
                required
                FormHelperTextProps={{
                  sx: { color: '#d32f2f', margin: '3px 0px 0px' }
                }}
              />
            </InputComponent>
            <InputComponent>
              <Label htmlFor="birthday">Ngày sinh</Label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disableFuture
                  inputFormat="DD/MM/YYYY"
                  views={['year', 'month', 'day']}
                  {...register('birthday')}
                  value={value}
                  onChange={(newValue) => {
                    setValues(newValue);
                    setValue('birthday', newValue);
                  }}
                  disabled={!editInfo}
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      {...params}
                      helperText={errors.birthday?.message}
                      inputProps={{
                        ...params.inputProps,
                        placeholder: 'Ngày/Tháng/Năm'
                      }}
                      FormHelperTextProps={{
                        sx: { color: '#d32f2f', margin: '3px 0px 0px' }
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </InputComponent>
            <InputComponent>
              <Label htmlFor="gender">Giới tính</Label>
              <Select
                fullWidth
                displayEmpty={true}
                id="gender"
                defaultValue={selectUser.gender}
                disabled={!editInfo}
                renderValue={(selected: any) => {
                  if (!selected) {
                    return (
                      <Typography component="span" sx={{ color: '#c5c5c5' }}>
                        Giới Tính
                      </Typography>
                    );
                  }
                  return selected;
                }}
                {...register('gender')}>
                <MenuItem value={'Nam'}>Nam</MenuItem>
                <MenuItem value={'Nữ'}>Nữ</MenuItem>
                <MenuItem value={'Khác'}>Khác</MenuItem>
              </Select>
            </InputComponent>
          </SectionContentRow>
          <SectionContentRow>
            <InputComponent>
              <Label htmlFor="province">Tỉnh/Thành phố</Label>
              <Select
                {...register('province')}
                fullWidth
                displayEmpty={true}
                id="province"
                defaultValue={selectUser.province_name}
                disabled={!editInfo}
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
            </InputComponent>
            <InputComponent>
              <Label htmlFor="district">Quận/Huyện</Label>
              <Select
                {...register('district')}
                fullWidth
                displayEmpty={true}
                id="district"
                defaultValue={selectUser.district_name}
                disabled={
                  !editInfo || (editInfo && (watch('province') ? false : true))
                }
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
              {errors.district && (
                <FormHelperText
                  sx={{ color: '#d32f2f', margin: '3px 0px 0px' }}>
                  {errors.district.message}
                </FormHelperText>
              )}
            </InputComponent>
            <InputComponent>
              <Label htmlFor="ward">Xã/Phường</Label>
              <Select
                {...register('ward')}
                fullWidth
                displayEmpty={true}
                id="ward"
                defaultValue={selectUser.ward_name}
                disabled={
                  !editInfo || (editInfo && (watch('district') ? false : true))
                }
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
              {errors.ward && (
                <FormHelperText
                  sx={{ color: '#d32f2f', margin: '3px 0px 0px' }}>
                  {errors.ward.message}
                </FormHelperText>
              )}
            </InputComponent>
          </SectionContentRow>
          <SectionContentRow>
            <CancelButton
              disabled={!editInfo}
              onClick={() => {
                setEditInfo(false);
              }}>
              Hủy Bỏ
            </CancelButton>
            <SavedButton
              disabled={!editInfo}
              onClick={handleSubmit(handleUserInfoSaveClick)}>
              Lưu
            </SavedButton>
          </SectionContentRow>
        </SectionInfo>
        <SectionInfo>
          <SectionHeader>
            <SectionHeaderTypo>Mật khẩu</SectionHeaderTypo>
            <CreateIcon onClick={handleEditPasswordClick} />
          </SectionHeader>
          <SectionContentRow>
            <InputComponent>
              <Label htmlFor="password">Mật khẩu mới</Label>
              <Field
                {...register('password')}
                helperText={errors.password?.message}
                disabled={!editPassword}
                type="password"
                id="password"
                defaultValue=""
                fullWidth
                required
                FormHelperTextProps={{
                  sx: { color: '#d32f2f', margin: '3px 0px 0px' }
                }}
              />
            </InputComponent>
          </SectionContentRow>
          <SectionContentRow>
            <InputComponent>
              <Label htmlFor="confirmedPassword">Xác nhận lại mật khẩu</Label>
              <Field
                {...register('confirmedPassword')}
                helperText={errors.confirmedPassword?.message}
                disabled={!editPassword}
                type="password"
                id="confirmedPassword"
                defaultValue=""
                fullWidth
                required
                FormHelperTextProps={{
                  sx: { color: '#d32f2f', margin: '3px 0px 0px' }
                }}
              />
            </InputComponent>
          </SectionContentRow>
          <SectionContentRow>
            <CancelButton
              disabled={!editPassword}
              onClick={() => {
                setEditPassword(false);
              }}>
              Hủy Bỏ
            </CancelButton>
            <SavedButton
              disabled={!editPassword}
              onClick={handleSubmit(handlePasswordSaveClick)}>
              Lưu
            </SavedButton>
          </SectionContentRow>
        </SectionInfo>
      </ResultContainer>
    </div>
  );
};

export default Account;

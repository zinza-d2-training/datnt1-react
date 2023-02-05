import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import CreateIcon from '@mui/icons-material/Create';
import { Button, MenuItem, Select, TextField, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import Divider from 'components/Divider';
import MenuUser from 'components/MenuUser';
import { districts, provinces, wards } from 'dummy-data';

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
  identificationCode: string;
  fullname: string;
  birthday: string;
  gender: string;
  province: string;
  district?: string;
  ward?: string;
  password: string;
  confirmedPassword: string;
}

const UserInfoSchema = yup.object().shape({
  identificationCode: yup
    .string()
    .required('Số CMND/CCCD/Mã định danh không được bỏ trống'),
  fullname: yup.string().required('Họ và tên không được bỏ trống'),
  birthday: yup.string().required('Ngày sinh không được bỏ trống'),
  gender: yup.string().required('Giới tính không được bỏ trống'),
  province: yup.string().required('Tỉnh/Thành phố không được bỏ trống'),
  district: yup.string().required('Quận/Huyện không được bỏ trống'),
  ward: yup.string().required('Xã/Phường không được bỏ trống'),
  password: yup.string().required('Mật khẩu mới không được bỏ trống'),
  confirmedPassword: yup
    .string()
    .required('Xác nhận lại mật khẩu không được bỏ trống')
});

const Account = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid }
  } = useForm<UserInfoInputs>({
    resolver: yupResolver(UserInfoSchema)
  });

  return (
    <div>
      <MenuUser userTab={'account'} />
      <Divider />

      <ResultContainer>
        <SectionInfo>
          <SectionHeader>
            <SectionHeaderTypo>Thông tin cá nhân</SectionHeaderTypo>
            <CreateIcon />
          </SectionHeader>
          <SectionContentRow>
            <InputComponent>
              <Label htmlFor="identificationCode">
                Số CMND/CCCD/Mã định danh
              </Label>
              <Field
                {...register('identificationCode')}
                helperText={errors.identificationCode?.message}
                type="text"
                id="identificationCode"
                defaultValue="030012345678" // value
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
                defaultValue="Nguyễn Văn A" // value
                fullWidth
                required
                FormHelperTextProps={{
                  sx: { color: '#d32f2f', margin: '3px 0px 0px' }
                }}
              />
            </InputComponent>
            <InputComponent>
              <Label htmlFor="birthday">Ngày sinh</Label>
              <Controller
                control={control}
                {...register('birthday')}
                name="birthday"
                render={({ field: { value, ...fieldProps } }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      {...fieldProps}
                      value={value}
                      renderInput={(params) => (
                        <TextField fullWidth {...params} />
                      )}
                    />
                  </LocalizationProvider>
                )}
              />
            </InputComponent>
            <InputComponent>
              <Label htmlFor="gender">Giới tính</Label>
              <Select
                fullWidth
                displayEmpty={true}
                id="gender"
                defaultValue={'Nam'}
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
                defaultValue={'Hà Nội'}
                renderValue={(selected: string) => {
                  if (!selected) {
                    return;
                    <PlaceholderTypo>Tỉnh/Thành phố</PlaceholderTypo>;
                  }
                  return selected;
                }}>
                {provinces.map((province) => (
                  <MenuItem key={province.province_id} value={province.name}>
                    {province.name}
                  </MenuItem>
                ))}
              </Select>
            </InputComponent>
            <InputComponent>
              <Label htmlFor="district">Quận/Huyện</Label>
              <Select
                // disabled={watch('province') ? false : true}
                {...register('district')}
                fullWidth
                displayEmpty={true}
                id="district"
                defaultValue={'Quận Đống Đa'}
                renderValue={(selected: string) => {
                  if (!watch('district')) {
                    return <PlaceholderTypo>Quận/Huyện</PlaceholderTypo>;
                  } else {
                    return selected;
                  }
                }}>
                {districts.map((district) => (
                  <MenuItem key={district.district_id} value={district.name}>
                    {district.name}
                  </MenuItem>
                ))}
              </Select>
            </InputComponent>
            <InputComponent>
              <Label htmlFor="ward">Xã/Phường</Label>
              <Select
                // disabled={watch('district') ? false : true}
                {...register('ward')}
                fullWidth
                displayEmpty={true}
                id="ward"
                defaultValue={'Phường Văn Chương'}
                renderValue={(selected: string) => {
                  if (!watch('ward')) {
                    return <PlaceholderTypo>Xã/Phường</PlaceholderTypo>;
                  } else {
                    return selected;
                  }
                }}>
                {wards.map((ward) => (
                  <MenuItem key={ward.ward_id} value={ward.name}>
                    {ward.name}
                  </MenuItem>
                ))}
              </Select>
            </InputComponent>
          </SectionContentRow>
          <SectionContentRow>
            <CancelButton>Hủy Bỏ</CancelButton>
            <SavedButton>Lưu</SavedButton>
          </SectionContentRow>
        </SectionInfo>
        <SectionInfo>
          <SectionHeader>
            <SectionHeaderTypo>Mật khẩu</SectionHeaderTypo>
            <CreateIcon />
          </SectionHeader>
          <SectionContentRow>
            <InputComponent>
              <Label htmlFor="password">Mật khẩu mới</Label>
              <Field
                // {...register('password')}
                // helperText={errors.password?.message}
                type="password"
                id="password"
                defaultValue="" // value
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
                type="password"
                id="confirmedPassword"
                defaultValue="" // value
                fullWidth
                required
                FormHelperTextProps={{
                  sx: { color: '#d32f2f', margin: '3px 0px 0px' }
                }}
              />
            </InputComponent>
          </SectionContentRow>
          <SectionContentRow>
            <CancelButton>Hủy Bỏ</CancelButton>
            <SavedButton>Lưu</SavedButton>
          </SectionContentRow>
        </SectionInfo>
      </ResultContainer>
    </div>
  );
};

export default Account;
